'use client';

import { Fragment, useState } from 'react';

import TitleWithConfidence from '@/app/components/TitleWithConfidence';
import SubSection from '@/app/components/SubSection';
import type { SectionDto, SubSectionDto } from '@/sanity/lib/definitions';
import BlockContent from './BlockContent';
import SectionSidebar from '@/app/components/SectionSidebar';
import ImageWithMultiply from '@/app/components/ImageWithMultiply';
import AboveTheFold from '@/app/components/AboveTheFold';

const Index = ({ sections }: { sections: SectionDto[] }) => {
  const [selectedSection, setSelectedSection] = useState<string | undefined>(undefined);

  return (
    <>
      <AboveTheFold />
      <div className="sidebar_grid_wrapper">
        <div className="sidebar_grid">
          {sections.map((section: SectionDto, i) => (
            <Fragment key={section._id}>
              <div className="sidebar_grid_span_8 w-full pt-16" id={section.name}>
                <TitleWithConfidence
                  title={section.name}
                  confidence="high"
                  titleSize={i === 0 ? 'small' : 'large'}
                />
              </div>
              <div className="sidebar_grid_left_column">
                {section.image && (
                  <div className="p-4 bg-accent-200">
                    <ImageWithMultiply image={section.image} alt={`${section.name} image`} />
                  </div>
                )}
              </div>
              <div className="sidebar_grid_right_column flex flex-col gap-y-1">
                <div className="-mx-5 sm:mx-0 -mb-4 p-5 bg-accent-200 text-lg/snug">
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
