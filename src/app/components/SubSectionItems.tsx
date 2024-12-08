import Link from "next/link";

import {
  SubSectionItemPageDto,
  SubSectionItemPatternDto,
} from "@/app/helpers/types";
import PatternTitle from "@/app/components/PatternTitle";
import { Fragment } from "react";
import classNames from "classnames";

type SubSectionItemsProps = {
  items: (SubSectionItemPageDto | SubSectionItemPatternDto)[] | undefined;
  minimalTitles?: boolean;
  onClick?: () => void;
};

const SubSectionItems = ({
  items,
  minimalTitles = false,
  onClick,
}: SubSectionItemsProps) => {
  if (!items || items.length === 0) return null;

  const linkClasses = classNames({
    "flex group": true,
    "py-1": minimalTitles,
  });
  return items.map(
    (item: SubSectionItemPatternDto | SubSectionItemPageDto, i) => (
      <Fragment key={item._id}>
        {item._type === "page" ? (
          <>
            <Link href={`/${item.slug}`} className={linkClasses}>
              <PatternTitle
                number={String.fromCharCode(97 + i)}
                name={item.name}
                noUnderline
                minimal={minimalTitles}
              />
            </Link>
            {item._type === "page" &&
              item?.sections &&
              item?.sections.length > 0 &&
              item.sections
                .filter((section) => section.name)
                .map((section) => (
                  <Link
                    href={`/${item.slug}#${section.slug}`}
                    className={linkClasses}
                    key={section._id}
                    onClick={onClick}
                  >
                    <PatternTitle
                      number="–"
                      name={section.name}
                      noUnderline
                      addPeriod={false}
                      minimal={minimalTitles}
                    />
                  </Link>
                ))}
          </>
        ) : (
          <Link href={`/patterns/${item.slug}`} className={linkClasses}>
            <PatternTitle
              number={String.fromCharCode(97 + i)}
              name={item.name}
              noUnderline
              minimal={minimalTitles}
            />
          </Link>
        )}
      </Fragment>
    )
  );
};

export default SubSectionItems;
