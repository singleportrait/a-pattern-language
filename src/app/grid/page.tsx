import { Fragment } from "react";
import classNames from "classnames";
import { sanityFetch } from "@/sanity/lib/live";
import { allPatternsWithReferencesPatternsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import {
  PatternBaseDto,
  PatternBaseWithReferencesDto,
} from "@/app/helpers/types";
import { confidenceDisplay } from "@/app/helpers/confidence";
import { addReferenceCounts } from "@/app/helpers/referenceCounts";
import { urlFor } from "@/sanity/lib/image";
import Menu from "@/app/components/Menu";

export const metadata = {
  title: "A Pattern Language",
};

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

export default async function Home() {
  const { data: patterns }: { data: PatternBaseWithReferencesDto[] } =
    await sanityFetch({
      query: allPatternsWithReferencesPatternsQuery,
    });

  // TODO: Do this as pre-formatting somewhere
  addReferenceCounts(patterns);
  console.log("Patterns", patterns);

  return (
    <>
      <Menu />
      <div className="py-12 max-w-screen-xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[1px]">
        {patterns.map((pattern: PatternBaseWithReferencesDto) => (
          <Link
            key={pattern._id}
            href={`/patterns/${pattern.slug}`}
            className="flex flex-col gap-2 p-1 group"
          >
            <p className="text-lg">
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
            <p>
              {pattern.references && pattern.references.length > 0
                ? `${pattern.references.length} references:`
                : null}
            </p>
            <ul className="list-disc list-inside">
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
    </>
  );
}
