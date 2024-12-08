"use client";

import Link from "next/link";
import classNames from "classnames";
import Sidebar from "@/app/components/Sidebar";
import { SectionDto, SubSectionDto } from "@/app/helpers/types";
import PatternTitle from "@/app/components/PatternTitle";
import { usePathname } from "next/navigation";

type PatternsSidebarProps = {
  sections: SectionDto[];
};

const PatternsSidebarContents = ({ sections }: PatternsSidebarProps) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-y-4">
      {sections
        .filter(
          (section) =>
            section.subSections[0].patterns &&
            section.subSections[0].patterns.length > 0
        )
        .map((section: SectionDto) => (
          <div key={section._id} className="flex flex-col gap-y-4">
            {section.name}

            {section?.subSections?.map((subSection: SubSectionDto) => (
              <div
                key={subSection._key}
                className="flex flex-col gap-y-2 text-sm"
              >
                {(subSection.title || subSection.description) && (
                  <div>
                    {subSection.title && (
                      <p className="text-xs uppercase">{subSection.title}</p>
                    )}
                    {subSection.description && (
                      <p className="text-xs">{subSection.description}</p>
                    )}
                  </div>
                )}
                {subSection.patterns?.map((pattern) => (
                  <Link
                    href={`/patterns/${pattern.slug}`}
                    key={pattern._id}
                    className={classNames({
                      "flex group": true,
                      "font-bold": pathname.includes(pattern.slug),
                    })}
                  >
                    <PatternTitle
                      minimal
                      number={pattern.number}
                      name={pattern.name}
                    />
                  </Link>
                ))}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

const PatternsSidebar = (props: PatternsSidebarProps) => {
  return (
    <Sidebar
      title="Index"
      renderContent={() => <PatternsSidebarContents {...props} />}
    />
  );
};

export default PatternsSidebar;
