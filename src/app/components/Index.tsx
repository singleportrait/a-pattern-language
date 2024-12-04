"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import classNames from "classnames";

import TitleWithConfidence from "@/app/components/TitleWithConfidence";
import SubSection from "@/app/components/SubSection";
import { SectionDto, SubSectionDto } from "@/app/helpers/types";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import BlockContent from "./BlockContent";

const Index = ({ sections }: { sections: SectionDto[] }) => {
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined
  );

  const sidebarSections = sections.filter((section) =>
    section.subSections.some(
      (subSection) =>
        subSection.title &&
        subSection.patterns &&
        subSection.patterns.length > 0
    )
  );
  console.log("Sidebar sections", sidebarSections);

  return (
    <div className="px-8 flex flex-col items-center justify-center min-h-screen gap-y-4">
      <div className="flex flex-col items-center md:items-start sm:ml-40 md:ml-auto md:grid md:grid-cols-12 xl:grid-cols-9 xl:max-w-screen-lg md:gap-x-10 mx-auto gap-y-4 py-12">
        <div className="md:col-span-8 md:col-start-4 xl:col-start-2 mb-12 w-full">
          <TitleWithConfidence title="A Pattern Language" confidence="high" />
          <div className=" flex flex-col gap-y-6">
            <ul className="text-lg flex justify-center items-center flex-col sm:flex-row gap-1 sm:gap-4 text-center">
              <li>Christopher Alexander</li>
              <li>Sara Ishikawa</li>
              <li>Murray Silverstein</li>
            </ul>
            <div className="flex items-center flex-col gap-1">
              <ul className="flex items-center flex-col sm:flex-row gap-1 sm:gap-4 text-center">
                <li>with</li>
                <li>Max Jacobson</li>
                <li>Ingrid Fiksdahl-King</li>
                <li>Shlomo Angel</li>
              </ul>
              <p>published 1977</p>
            </div>
          </div>
        </div>
        {sections.map((section: SectionDto, i) => (
          <Fragment key={section._id}>
            <div className="md:col-span-8 md:col-start-4 xl:col-start-2 w-full">
              <TitleWithConfidence
                title={section.name}
                confidence="high"
                titleSize={i === 0 ? "small" : "large"}
              />
            </div>
            <div className="md:col-span-3 md:col-start-4 xl:col-start-2">
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
            <div className="md:col-span-5 md:col-start-7 xl:col-start-5 flex flex-col gap-y-1">
              <div className="-mx-5 p-5 bg-accent text-lg font-sans">
                <BlockContent content={section.description} />
              </div>
              {section?.subSections?.map((subSection: SubSectionDto) => (
                <SubSection
                  key={subSection._key}
                  subSection={subSection}
                  setSelectedSection={setSelectedSection}
                />
              ))}
            </div>
          </Fragment>
        ))}
        <div className="md:col-span-8 md:col-start-4 xl:col-start-2 mb-12 w-full">
          <TitleWithConfidence confidence="high" />
        </div>
      </div>
      <div className="hidden sm:flex fixed left-0 top-8 bg-accent p-6 pb-20 sm:w-3/12 lg:w-2/12 min-w-36 max-w-64 h-screen flex-col gap-y-8 overflow-y-scroll">
        {sidebarSections.map((section) => (
          <div key={section._id} className="flex flex-col gap-y-2">
            <div className="uppercase text-xs">{section.name}</div>
            {section?.subSections
              ?.filter((subSection) => subSection.title)
              .map((subSection) => (
                <Link
                  key={subSection._key}
                  href={`#${subSection._key}`}
                  className={classNames({
                    "flex sm:flex-col md:flex-row lg:flex-col xl:flex-row gap-x-2 hover:underline text-sm":
                      true,
                    "font-bold": selectedSection === subSection._key,
                  })}
                  shallow
                >
                  {/* First pattern to last pattern */}
                  {subSection.patterns && subSection.patterns.length > 0 && (
                    <div className="w-16 shrink-0">
                      {subSection.patterns[0].number}–
                      {Object.values(subSection.patterns).length -
                        1 +
                        subSection.patterns[0].number}
                    </div>
                  )}
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
