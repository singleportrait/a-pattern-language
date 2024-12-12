"use client";

import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";

import { urlFor } from "@/sanity/lib/image";
import type {
  PatternBaseWithReferencesDto,
  PatternBaseDto,
} from "@/sanity/lib/definitions";
import { confidenceDisplay } from "@/app/helpers/confidence";
import TitleWithConfidence from "@/app/components/TitleWithConfidence";

const PatternTitle = ({
  pattern,
  noUnderline = false,
}: {
  pattern: PatternBaseDto;
  noUnderline?: boolean;
}) => (
  <>
    <span className="w-12">{pattern.number} </span>
    <span
      className={classNames({
        "group-hover:underline underline-offset-2": true,
        underline: !noUnderline,
      })}
    >
      {pattern.name}
    </span>
    &nbsp;
    {confidenceDisplay(pattern.confidence)}
  </>
);

const PatternsGrid = ({
  patterns,
}: {
  patterns: PatternBaseWithReferencesDto[];
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sortType = searchParams.get("sort") || "number";

  const sortFunction = (
    a: PatternBaseWithReferencesDto,
    b: PatternBaseWithReferencesDto
  ) => {
    if (sortType === "referenceCount") {
      if (a.references && b.references) {
        return b.references.length - a.references.length;
      }
    }
    return a.number - b.number;
  };

  return (
    <div>
      <TitleWithConfidence title="All Patterns" confidence="high" />
      {sortType === "number" && (
        <Link
          type="button"
          href={`${pathname}?sort=referenceCount`}
          className="bg-accent-200 text-black p-2 rounded-md mb-4 mx-auto inline-block"
          scroll={false}
        >
          Sort by reference count
        </Link>
      )}
      {sortType === "referenceCount" && (
        <Link
          href={`${pathname}?sort=number`}
          className="bg-accent-200 text-black p-2 rounded-md mb-4 mx-auto inline-block"
          scroll={false}
        >
          Sort by number
        </Link>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0.5 p-0.5 bg-gray-100">
        {patterns
          .sort(sortFunction)
          .map((pattern: PatternBaseWithReferencesDto) => (
            <Link
              key={pattern._id}
              href={`/patterns/${pattern.slug}`}
              className="flex flex-col gap-2 p-2 group bg-white"
            >
              <p className="text-xl pt-2 pb-2">
                <PatternTitle pattern={pattern} noUnderline />
              </p>
              {pattern.image && (
                <Image
                  src={urlFor(pattern.image).width(800).url() || ""}
                  alt={`${pattern.number}. ${pattern.name} image`}
                  width={400}
                  height={400}
                  className="mix-blend-multiply"
                />
              )}
              {!pattern.image && pattern.diagram && (
                <Image
                  src={urlFor(pattern.diagram).width(800).url() || ""}
                  alt={`${pattern.number}. ${pattern.name} diagram`}
                  width={400}
                  height={400}
                  className="mix-blend-multiply"
                />
              )}
              <p className="font-bold">
                {pattern.references && pattern.references.length > 0
                  ? `${pattern.references.length} references`
                  : null}
              </p>
              <ul className="list-disc list-outside ml-6 text-neutral-400">
                {pattern.references &&
                  pattern.references.length > 0 &&
                  pattern.references?.map((reference) => (
                    <li key={reference._id}>
                      {reference.number} {reference.name}
                    </li>
                  ))}
              </ul>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PatternsGrid;
