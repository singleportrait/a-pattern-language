import { sanityFetch } from "@/sanity/lib/live";
import {
  allPatternsWithReferencePatternsQuery,
  sectionsQuery,
} from "@/sanity/lib/queries";
import Link from "next/link";
import {
  PatternBaseDto,
  PatternBaseWithReferencesDto,
  SectionDto,
  SubSectionDto,
} from "./helpers/types";
import { confidenceDisplay } from "./helpers/confidence";
import { Fragment } from "react";
import { addReferenceCounts } from "./helpers/referenceCounts";

export const metadata = {
  title: "A Pattern Language",
};

export default async function Home() {
  const { data: patterns }: { data: PatternBaseWithReferencesDto[] } =
    await sanityFetch({
      query: allPatternsWithReferencePatternsQuery,
    });
  const { data: sections }: { data: SectionDto[] } = await sanityFetch({
    query: sectionsQuery,
  });

  // TODO: Do this as pre-formatting somewhere
  addReferenceCounts(patterns);
  console.log("Patterns", patterns);
  // console.log("Sections", sections);

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen gap-y-4">
      <h1>A Pattern Language</h1>

      <h2>Patterns in sections</h2>
      <div className="flex flex-col items-center gap-y-8">
        {sections.map((section: SectionDto) => (
          <div key={section._id} className="flex flex-col items-center gap-y-4">
            <h3>{section.name}</h3>
            <p className="italic">{section.description}</p>
            {section?.subSections?.map((subSection: SubSectionDto) => (
              <Fragment key={subSection._key}>
                {subSection.description && <p>{subSection.description}</p>}
                {subSection.patterns.map((pattern: PatternBaseDto) => (
                  <Link key={pattern._id} href={`/patterns/${pattern.slug}`}>
                    <h4>
                      {pattern.number}.{" "}
                      <span className="underline">{pattern.name}</span>{" "}
                      {confidenceDisplay(pattern.confidence)}
                    </h4>
                  </Link>
                ))}
              </Fragment>
            ))}
          </div>
        ))}
      </div>

      <hr className="w-full" />
      <h2>All patterns</h2>
      {patterns.map((pattern: PatternBaseDto) => (
        <Link key={pattern._id} href={`/patterns/${pattern.slug}`}>
          <p>
            {pattern.number}. <span className="underline">{pattern.name}</span>{" "}
            {confidenceDisplay(pattern.confidence)}
            {pattern.referencesCount ? (
              <span> - {pattern.referencesCount} references</span>
            ) : null}
          </p>
        </Link>
      ))}
    </div>
  );
}
