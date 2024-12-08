"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { SectionDto } from "@/app/helpers/types";
import SubSectionItems from "@/app/components/SubSectionItems";
import { Dialog, DialogPanel } from "@headlessui/react";

type SectionSidebarProps = {
  sections: SectionDto[];
  selectedSection: string | undefined;
  showType?: "patterns" | "items";
  linkSectionName?: boolean;
};

const SectionSidebarContents = ({
  sections,
  selectedSection,
  showType = "patterns",
  linkSectionName = true,
}: SectionSidebarProps) => (
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
                    {subSection.patterns && subSection.patterns.length > 1 && (
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
);

const tableOfContentsClasses =
  "flex fixed z-10 left-0 top-0 h-10 pl-5 items-center text-sm";
const sidebarClasses = "fixed left-0 top-11 w-56 bg-accent overflow-hidden";

const SectionSidebar = (props: SectionSidebarProps) => {
  // console.log("Sidebar sections", sections);
  // console.log("Subsections", sections[0].subSections);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="hidden sm:block">
        <div
          className={classNames(
            tableOfContentsClasses,
            "w-57 bg-accent border-r-4 border-r-white"
          )}
        >
          Table of Contents:
        </div>
        <div className={classNames(sidebarClasses, "h-screen")}>
          <SectionSidebarContents {...props} />
        </div>
      </div>
      <div className="block sm:hidden">
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={tableOfContentsClasses}
        >
          Table of Contents
        </button>
        <Dialog open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
          <DialogPanel
            transition
            className={classNames(
              sidebarClasses,
              "h-screen",
              "transition duration-300 ease-out data-[closed]:-translate-x-full"
            )}
          >
            <SectionSidebarContents {...props} />
          </DialogPanel>
        </Dialog>
      </div>
    </>
  );
};

export default SectionSidebar;
