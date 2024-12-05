"use client";

import { Fragment } from "react";
import Link from "next/link";
import classNames from "classnames";

import {
  SubSectionDto,
  PatternBaseDto,
  SubSectionItemPatternDto,
  SubSectionItemPageDto,
} from "@/app/helpers/types";
import { useEffect, useRef } from "react";
// import { confidenceDisplay } from "@/app/helpers/confidence";

const PatternTitle = ({
  number,
  name,
  noUnderline = false,
  addPeriod = true,
}: {
  number: number | string;
  name: string;
  noUnderline?: boolean;
  addPeriod?: boolean;
}) => (
  <h4 className="flex text-lg py-0.5 pl-8 sm:pl-12">
    <p className="w-12 uppercase shrink-0">
      {number}
      {addPeriod ? "." : ""}
    </p>
    <p
      className={classNames({
        "group-hover:underline underline-offset-2": true,
        underline: !noUnderline,
      })}
    >
      {name}
    </p>
    {/* &nbsp; */}
    {/* {confidenceDisplay(pattern.confidence)} */}
  </h4>
);

const SubSection = ({
  subSection,
  setSelectedSection,
}: {
  subSection: SubSectionDto;
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
        {subSection.patterns &&
          subSection.patterns.length > 0 &&
          subSection.patterns.map((pattern: PatternBaseDto) => (
            <Link
              key={pattern._id}
              href={`/patterns/${pattern.slug}`}
              className="group"
            >
              <PatternTitle
                number={pattern.number}
                name={pattern.name}
                noUnderline
              />
            </Link>
          ))}
        {subSection.items &&
          subSection.items.length > 0 &&
          subSection.items.map(
            (item: SubSectionItemPatternDto | SubSectionItemPageDto, i) => (
              <Fragment key={item._id}>
                {item._type === "page" ? (
                  <>
                    <Link href={`/${item.slug}`} className="group">
                      <PatternTitle
                        number={String.fromCharCode(97 + i)}
                        name={item.name}
                        noUnderline
                      />
                    </Link>
                    {item._type === "page" &&
                      item?.sections &&
                      item?.sections.length > 0 &&
                      item.sections.map((section) => (
                        <Link
                          href={`/${item.slug}#${section.slug}`}
                          className="group"
                          key={section._id}
                        >
                          <PatternTitle
                            number="–"
                            name={section.name}
                            noUnderline
                            addPeriod={false}
                          />
                        </Link>
                      ))}
                  </>
                ) : (
                  <Link href={`/patterns/${item.slug}`} className="group">
                    <PatternTitle
                      number={String.fromCharCode(97 + i)}
                      name={item.name}
                      noUnderline
                    />
                  </Link>
                )}
              </Fragment>
            )
          )}
      </div>
    </div>
  );
};

export default SubSection;
