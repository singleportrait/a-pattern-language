'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

import type { SubSectionDto, PatternBaseDto } from '@/sanity/lib/definitions';
import PatternTitle from '@/app/components/PatternTitle';
import SubSectionItems from '@/app/components/SubSectionItems';

const SubSection = ({
  subSection,
  setSelectedSection,
}: {
  subSection: SubSectionDto;
  setSelectedSection: (key: string) => void;
}) => {
  const subSectionRef = useRef<HTMLDivElement>(null);

  // const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    const highlightOnScroll = () => {
      if (!subSectionRef.current || subSectionRef.current?.offsetTop === 0) return;
      const innerHeight = window.innerHeight;
      // When scrollY is at 1/3 of the screen height, highlight the section
      const highlightThreshold = innerHeight / 3;
      const offsetTop = subSectionRef.current?.offsetTop || 0;
      const scrollY = window.scrollY;
      const elementHeight = subSectionRef.current.clientHeight;
      if (
        scrollY + highlightThreshold >= offsetTop &&
        scrollY < offsetTop + elementHeight &&
        offsetTop > scrollY
      ) {
        // setHighlighted(true);
        setSelectedSection(subSection._key);
      } else {
        // setHighlighted(false);
      }
      if (!subSectionRef.current.textContent) return;
    };

    window.addEventListener('scroll', highlightOnScroll);

    return () => {
      window.removeEventListener('scroll', highlightOnScroll);
    };
  }, [subSection, setSelectedSection]);

  return (
    <div
      key={subSection._key}
      id={subSection._key}
      className="flex flex-col gap-y-2 pt-16 -mb-4"
      ref={subSectionRef}
    >
      {subSection.title && (
        <h3 className="text-xs uppercase text-neutral-700">{subSection.title}</h3>
      )}
      {subSection.description && <p className="text-lg">{subSection.description}</p>}
      <div className="flex flex-col">
        {subSection.patterns &&
          subSection.patterns.length > 0 &&
          subSection.patterns.map((pattern: PatternBaseDto) => (
            <Link key={pattern._id} href={`/patterns/${pattern.slug}`} className="group">
              <PatternTitle number={pattern.number} name={pattern.name} noUnderline />
            </Link>
          ))}
        <SubSectionItems items={subSection.items} />
      </div>
    </div>
  );
};

export default SubSection;
