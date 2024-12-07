"use client";

import { Fragment, useState } from "react";
import Image from "next/image";

import TitleWithConfidence from "@/app/components/TitleWithConfidence";
import SubSection from "@/app/components/SubSection";
import { SectionDto, SubSectionDto } from "@/app/helpers/types";
import { urlFor } from "@/sanity/lib/image";
import BlockContent from "./BlockContent";
import SectionSidebar from "@/app/components/SectionSidebar";

const Index = ({ sections }: { sections: SectionDto[] }) => {
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined
  );

  return (
    <>
      <div className="sidebar_grid_wrapper">
        <div className="sidebar_grid">
          <div className="sidebar_grid_span_8 mb-12 w-full">
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
              <div
                className="sidebar_grid_span_8 w-full pt-16"
                id={section.name}
              >
                <TitleWithConfidence
                  title={section.name}
                  confidence="high"
                  titleSize={i === 0 ? "small" : "large"}
                />
              </div>
              <div className="sidebar_grid_left_column">
                {section.image && (
                  <div className="p-4 bg-accent">
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
              <div className="sidebar_grid_right_column flex flex-col gap-y-1">
                <div className="-mx-5 sm:mx-0 p-5 bg-accent text-lg/snug">
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
          <div className="sidebar_grid_span_8 mb-12 w-full">
            <TitleWithConfidence confidence="high" />
          </div>
        </div>
      </div>
      <SectionSidebar sections={sections} selectedSection={selectedSection} />
    </>
  );
};

export default Index;
