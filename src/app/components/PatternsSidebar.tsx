'use client';

import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useRef } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/Sidebar';
import type { SectionDto, SubSectionDto } from '@/sanity/lib/definitions';
import PatternTitle from '@/app/components/PatternTitle';

type PatternsSidebarProps = {
  sections: SectionDto[];
};

const PatternsSidebarContents = ({ sections }: PatternsSidebarProps) => {
  const pathname = usePathname();
  const container = useRef<HTMLDivElement>(null);
  const currentSection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = container.current;
    const parent = content?.parentElement;
    const pattern = currentSection.current;
    if (!content || !parent || !pattern) return;

    const patternTop = pattern.offsetTop;
    const distanceFromTop = 16;

    parent.scrollTop = patternTop - distanceFromTop;
  }, []);

  return (
    <div className="flex flex-col gap-y-8" ref={container}>
      {sections.map((section: SectionDto) => (
        <div key={section._id} className="flex flex-col gap-y-1">
          {/* If section has sub-sections with items and one of them is a page, render the section name as a link to the first page */}
          {section?.subSections?.some(subSection =>
            subSection.items?.some(item => item._type === 'page'),
          ) ? (
            <Link
              href={`/${section.subSections.find(subSection => subSection.items?.some(item => item._type === 'page'))?.items?.find(item => item._type === 'page')?.slug}`}
              className="uppercase text-xs hover:underline py-1"
            >
              {section.name}
            </Link>
          ) : (
            <Link href={`/#${section.name}`} className="uppercase text-xs hover:underline py-1">
              {section.name}
            </Link>
          )}

          {section?.subSections
            ?.filter(subSection => subSection.patterns?.length)
            .map((subSection: SubSectionDto) => (
              <div
                key={subSection._key}
                className="flex flex-col text-sm pb-4"
                ref={
                  subSection.patterns?.find(p => pathname.includes(p.slug)) ? currentSection : null
                }
              >
                {(subSection.title || subSection.description) && (
                  <div className="pb-1">
                    {subSection.title && <p className="text-xs uppercase">{subSection.title}</p>}
                    {subSection.description && <p className="text-xs">{subSection.description}</p>}
                  </div>
                )}
                {subSection.patterns?.map(pattern => (
                  <Fragment key={pattern._id}>
                    {pathname.includes(pattern.slug) ? (
                      <div className="flex font-bold py-1">
                        <PatternTitle minimal number={pattern.number} name={pattern.name} />
                      </div>
                    ) : (
                      <Link href={`/patterns/${pattern.slug}`} className="flex group py-1">
                        <PatternTitle minimal number={pattern.number} name={pattern.name} />
                      </Link>
                    )}
                  </Fragment>
                ))}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

const PatternsSidebar = (props: PatternsSidebarProps) => {
  return <Sidebar title="Index" renderContent={() => <PatternsSidebarContents {...props} />} />;
};

export default PatternsSidebar;
