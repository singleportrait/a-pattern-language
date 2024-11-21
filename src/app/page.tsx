import { sanityFetch } from "@/sanity/lib/live";
import {
  allPatternsWithReferencesPatternsQuery,
  sectionsQuery,
} from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import {
  PatternBaseDto,
  PatternBaseWithReferencesDto,
  SectionDto,
  SubSectionDto,
} from "./helpers/types";
import { confidenceDisplay } from "./helpers/confidence";
import { Fragment } from "react";
import { addReferenceCounts } from "./helpers/referenceCounts";
import { urlFor } from "@/sanity/lib/image";

export const metadata = {
  title: "A Pattern Language",
};

const PatternTitle = ({
  pattern,
  noUnderline = false,
}: {
  pattern: PatternBaseDto;
  noUnderline?: boolean;
}) => (
  <>
    {pattern.number}.{" "}
    <span className={noUnderline ? "" : "underline"}>{pattern.name}</span>&nbsp;
    {confidenceDisplay(pattern.confidence)}
  </>
);

export default async function Home() {
  const { data: patterns }: { data: PatternBaseWithReferencesDto[] } =
    await sanityFetch({
      query: allPatternsWithReferencesPatternsQuery,
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

      <h2 className="h2">Patterns in sections</h2>
      <div className="flex flex-col items-center gap-y-8">
        {sections.map((section: SectionDto) => (
          <div key={section._id} className="flex flex-col items-center gap-y-8">
            <h3 className="h2">{section.name}</h3>
            <p className="italic">{section.description}</p>
            {section?.subSections?.map((subSection: SubSectionDto) => (
              <div
                key={subSection._key}
                className="flex flex-col items-center gap-y-2"
              >
                {subSection.description && <p>{subSection.description}</p>}
                {subSection.patterns.map((pattern: PatternBaseDto) => (
                  <Link key={pattern._id} href={`/patterns/${pattern.slug}`}>
                    <h4>
                      <PatternTitle pattern={pattern} />
                    </h4>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <hr className="w-full" />
      <h2 className="h2">All patterns</h2>
      {patterns.map((pattern: PatternBaseWithReferencesDto) => (
        <Link key={pattern._id} href={`/patterns/${pattern.slug}`}>
          <p>
            <PatternTitle pattern={pattern} />
            {pattern.references ? (
              <span> - {pattern.references.length} references</span>
            ) : null}
          </p>
          {/* References:
          {pattern.references &&
            pattern.references.length > 0 &&
            pattern.references?.map((reference) => (
              <div key={reference._id}>{reference.name}</div>
            ))} */}
        </Link>
      ))}

      <hr className="w-full" />
      <h2>All patterns in a grid</h2>
      <div className="max-w-screen-xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 bg-amber-100 border-2 border-amber-100 gap-[2px]">
        {patterns.map((pattern: PatternBaseDto) => (
          <Link
            key={pattern._id}
            href={`/patterns/${pattern.slug}`}
            className="flex flex-col gap-2 p-3 bg-white"
          >
            <p className="text-lg">
              <PatternTitle pattern={pattern} noUnderline />
            </p>
            {pattern.image && (
              <Image
                src={urlFor(pattern.image).width(800).url() || ""}
                alt={`${pattern.number}. ${pattern.name} image`}
                width={400}
                height={400}
              />
            )}
            {!pattern.image && pattern.diagram && (
              <Image
                src={urlFor(pattern.diagram).width(800).url() || ""}
                alt={`${pattern.number}. ${pattern.name} diagram`}
                width={400}
                height={400}
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
