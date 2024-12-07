import Link from "next/link";
import classNames from "classnames";
import { SectionDto } from "@/app/helpers/types";
import SubSectionItems from "@/app/components/SubSectionItems";
import { Fragment } from "react";

type SectionSidebarProps = {
  sections: SectionDto[];
  selectedSection: string | undefined;
  showType?: "patterns" | "items";
  linkSectionName?: boolean;
};

const SectionSidebar = ({
  sections,
  selectedSection,
  showType = "patterns",
  linkSectionName = true,
}: SectionSidebarProps) => {
  // console.log("Sidebar sections", sections);
  // console.log("Subsections", sections[0].subSections);

  return (
    <>
      <div className="hidden sm:flex fixed z-10 left-0 top-0 h-10 w-57 bg-accent pl-5 items-center text-sm border-r-4 border-r-white">
        Table of Contents:
      </div>
      <div className="hidden sm:block fixed left-0 top-11 w-56 bg-accent h-screen overflow-hidden">
        <div className="flex flex-col gap-y-8 h-screen overflow-y-scroll w-60 pt-5 pl-5 pr-9 pb-20">
          {sections.map((section) => (
            <div key={section._id} className="flex flex-col gap-y-2 text-sm">
              {linkSectionName && (
                <Link
                  href={`#${section.name}`}
                  className="uppercase text-xs hover:underline"
                >
                  {section.name}
                </Link>
              )}
              {!linkSectionName && (
                <p className="uppercase text-xs">{section.name}</p>
              )}
              {/* TODO: Don't print empty subSection without title on index page, but print on pages */}
              {section?.subSections
                // ?.filter((subSection) => subSection.title)
                .map((subSection) => (
                  <Fragment key={subSection._key}>
                    {showType === "patterns" && (
                      <Link
                        key={subSection._key}
                        href={`#${subSection._key}`}
                        className={classNames({
                          "flex group": true,
                          "font-bold": selectedSection === subSection._key,
                        })}
                        shallow
                      >
                        {/* First pattern to last pattern */}
                        <>
                          {subSection.patterns &&
                            subSection.patterns.length > 1 && (
                              <div className="w-17 shrink-0">
                                {subSection.patterns[0].number}–
                                {Object.values(subSection.patterns).length -
                                  1 +
                                  subSection.patterns[0].number}
                              </div>
                            )}
                          <div className="group-hover:underline">
                            {subSection.title}
                          </div>
                        </>
                      </Link>
                    )}
                    {showType === "items" && (
                      <SubSectionItems items={subSection.items} minimalTitles />
                    )}
                  </Fragment>
                ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionSidebar;
