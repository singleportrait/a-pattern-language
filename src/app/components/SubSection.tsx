"use client";

import Link from "next/link";
import classNames from "classnames";

import { SubSectionDto, PatternBaseDto } from "@/app/helpers/types";
import { useEffect, useRef } from "react";
// import { confidenceDisplay } from "@/app/helpers/confidence";

const PatternTitle = ({
  pattern,
  noUnderline = false,
}: {
  pattern: PatternBaseDto;
  noUnderline?: boolean;
}) => (
  <>
    <span className="inline-block w-12">{pattern.number}.</span>
    <span
      className={classNames({
        "group-hover:underline underline-offset-2": true,
        underline: !noUnderline,
      })}
    >
      {pattern.name}
    </span>
    {/* &nbsp; */}
    {/* {confidenceDisplay(pattern.confidence)} */}
  </>
);

const SubSection = ({
  subSection,
  i,
  setSelectedSection,
}: {
  subSection: SubSectionDto;
  i: number;
  setSelectedSection: (key: string) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    const highlightOnScroll = () => {
      if (!ref.current || ref.current?.offsetTop === 0) return;
      const innerHeight = window.innerHeight;
      // When scrollY is at 1/3 of the screen height, highlight the section
      const highlightThreshold = innerHeight / 3;
      const offsetTop = ref.current?.offsetTop || 0;
      const scrollY = window.scrollY;
      const elementHeight = ref.current.clientHeight;
      if (
        scrollY + highlightThreshold >= offsetTop &&
        scrollY < offsetTop + elementHeight &&
        offsetTop > scrollY
      ) {
        console.log("Highlighting", ref.current.textContent);
        // setHighlighted(true);
        setSelectedSection(subSection._key);
      } else {
        // setHighlighted(false);
      }
      if (!ref.current.textContent) return;
      if (i !== 0) return;

      // console.log("------");
      // console.log("Ref height", ref.current.clientHeight);
      // console.log("Ref current", ref.current);
      // console.log("Section:", ref.current.textContent);
      // console.log("window scrollY", window.scrollY);
      // console.log("window innerHeight", window.innerHeight);
      // console.log("Ref offsetTop", ref.current.offsetTop);
    };

    window.addEventListener("scroll", highlightOnScroll);

    return () => {
      window.removeEventListener("scroll", highlightOnScroll);
    };
  }, [subSection]);

  return (
    <div
      key={subSection._key}
      id={subSection._key}
      className={classNames({
        "flex flex-col gap-y-2 -mx-5 p-5": true,
        // "bg-slate-100": highlighted,
        // "border-l-2": true,
        // "border-l-transparent": !highlighted,
        // "border-l-accent": highlighted,
      })}
      ref={ref}
    >
      {subSection.title && (
        <h3
          className={classNames({
            "text-xs": true,
            "text-neutral-700 uppercase": true,
            // "font-bold": highlighted,
          })}
        >
          {subSection.title}
        </h3>
      )}
      {subSection.description && (
        <p className="text-lg">{subSection.description}</p>
      )}
      <div className="flex flex-col">
        {subSection.patterns.map((pattern: PatternBaseDto) => (
          <Link
            key={pattern._id}
            href={`/patterns/${pattern.slug}`}
            className="group"
          >
            <h4 className="text-lg py-0.5 pl-12">
              <PatternTitle pattern={pattern} noUnderline />
            </h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubSection;
