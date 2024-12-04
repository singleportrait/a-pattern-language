"use client";

import { useState } from "react";
import Image from "next/image";
import classNames from "classnames";

import TitleWithConfidence from "@/app/components/TitleWithConfidence";
import SubSection from "@/app/components/SubSection";
import { SectionDto, SubSectionDto } from "@/app/helpers/types";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const Index = ({ sections }: { sections: SectionDto[] }) => {
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined
  );

  return (
    <div className="px-8 flex flex-col items-center justify-center min-h-screen gap-y-4">
      {sections.map((section: SectionDto, j) => (
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
          <div className="gridRightCol md:col-start-3 xl:col-start-4 flex flex-col gap-y-1">
            <div className="-mx-5 p-5 bg-accent text-lg font-sans">
              <p>{section.description}</p>
            </div>
            {section?.subSections?.map((subSection: SubSectionDto, i) => (
              <SubSection
                key={subSection._key}
                subSection={subSection}
                i={j === 0 ? i : i + 100}
                setSelectedSection={setSelectedSection}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="fixed left-0 top-8 bg-accent p-5 w-60 h-screen flex flex-col gap-y-8">
        {sections.map((section) => (
          <div key={section._id} className="flex flex-col gap-y-2">
            <div className="uppercase text-xs">{section.name}</div>
            {section?.subSections
              ?.filter((subSection) => subSection.title)
              .map((subSection) => (
                <Link
                  key={subSection._key}
                  href={`#${subSection._key}`}
                  className={classNames({
                    "flex gap-x-2 hover:underline text-sm": true,
                    "font-bold": selectedSection === subSection._key,
                  })}
                  shallow
                >
                  {/* First pattern to last pattern */}
                  <div className="w-16 shrink-0">
                    {subSection.patterns[0].number}–
                    {Object.values(subSection.patterns).length -
                      1 +
                      subSection.patterns[0].number}
                  </div>
                  <div>{subSection.title}</div>
                </Link>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
