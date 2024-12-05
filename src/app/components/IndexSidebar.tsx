import Link from "next/link";
import classNames from "classnames";
import { SectionDto } from "@/app/helpers/types";

type IndexSidebarProps = {
  sections: SectionDto[];
  selectedSection: string | undefined;
};

const IndexSidebar = ({ sections, selectedSection }: IndexSidebarProps) => {
  const sidebarSections = sections;
  // const sidebarSections = sections.filter((section) =>
  //   section.subSections.some(
  //     (subSection) =>
  //       subSection.title &&
  //       subSection.patterns &&
  //       subSection.patterns.length > 0
  //   )
  // );
  console.log("Sidebar sections", sidebarSections);

  return (
    <>
      <div className="hidden sm:flex fixed z-10 left-0 top-0 h-10 w-57 bg-accent pl-5 items-center text-sm border-r-4 border-r-white">
        Table of Contents:
      </div>
      <div className="hidden sm:block fixed left-0 top-11 w-56 bg-accent h-screen overflow-hidden">
        <div className="flex flex-col gap-y-8 h-screen overflow-y-scroll w-60 pt-5 pl-5 pr-5 pb-20">
          {sidebarSections.map((section) => (
            <div key={section._id} className="flex flex-col gap-y-2">
              <Link
                href={`#${section.name}`}
                className="uppercase text-xs hover:underline"
              >
                {section.name}
              </Link>
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
                    {subSection.patterns && subSection.patterns.length > 0 && (
                      <div className="w-15 shrink-0">
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
    </>
  );
};

export default IndexSidebar;
