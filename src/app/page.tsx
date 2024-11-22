import { Fragment } from "react";
import classNames from "classnames";
import { sanityFetch } from "@/sanity/lib/live";
import { sectionsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import { PatternBaseDto, SectionDto, SubSectionDto } from "@/app/helpers/types";
import { confidenceDisplay } from "@/app/helpers/confidence";
import { urlFor } from "@/sanity/lib/image";
import Menu from "@/app/components/Menu";
import TitleWithConfidence from "@/app/components/TitleWithConfidence";

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
    <span className="inline-block w-10">{pattern.number}</span>
    <span
      className={classNames({
        "group-hover:underline underline-offset-2": true,
        underline: !noUnderline,
      })}
    >
      {pattern.name}
    </span>
    &nbsp;
    {confidenceDisplay(pattern.confidence)}
  </>
);

export default async function Home() {
  const { data: sections }: { data: SectionDto[] } = await sanityFetch({
    query: sectionsQuery,
  });

  // TODO: Add reference counts onto section patterns and/or merge with all patterns
  // console.log("Sections", sections);

  return (
    <>
      <Menu isIndex />
      <div className="px-8 flex flex-col items-center justify-center min-h-screen gap-y-4">
        {sections.map((section: SectionDto) => (
          <div key={section._id} className="gridWrapper py-12">
            <div className="gridColSpanContent">
              <TitleWithConfidence title={section.name} confidence="high" />
            </div>
            <div className="gridLeftCol">
              {section.image && (
                <div className="p-5 bg-accent">
                  <Image
                    src={urlFor(section.image).width(1000).url() || ""}
                    alt={`${section.name} image`}
                    width={500}
                    height={500}
                    className="mix-blend-multiply"
                  />
                </div>
              )}
            </div>
            <div className="gridRightCol md:col-start-3 xl:col-start-4 flex flex-col gap-y-6">
              <div className="-mx-5 p-5 bg-accent text-lg font-sans">
                <p>{section.description}</p>
              </div>
              {section?.subSections?.map((subSection: SubSectionDto) => (
                <Fragment key={subSection._key}>
                  {subSection.description && <p>{subSection.description}</p>}
                  <div className="flex flex-col">
                    {subSection.patterns.map((pattern: PatternBaseDto) => (
                      <Link
                        key={pattern._id}
                        href={`/patterns/${pattern.slug}`}
                        className="group"
                      >
                        <h4 className="text-lg py-1.5 pl-12">
                          <PatternTitle pattern={pattern} noUnderline />
                        </h4>
                      </Link>
                    ))}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
