import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import {
  allPatternsSlugsQuery,
  patternSlugQuery,
  patternSiblingsQuery,
} from "@/sanity/lib/queries";
import Pattern from "@/app/components/Pattern";
import { PatternBaseDto, PatternDto } from "@/app/helpers/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: allPatternsSlugsQuery,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: pattern } = await sanityFetch({
    query: patternSlugQuery,
    params,
    stega: false,
  });

  return {
    title: `${pattern?.number}. ${pattern?.name}`,
    description: pattern?.problem,
  } satisfies Metadata;
}

export default async function PatternPage(props: Props) {
  const params = await props.params;
  const { data: pattern }: { data: PatternDto } = await sanityFetch({
    query: patternSlugQuery,
    params,
  });

  if (!pattern?._id) return notFound();

  const {
    data: { previousPattern, nextPattern },
  }: {
    data: { previousPattern: PatternBaseDto; nextPattern: PatternBaseDto };
  } = await sanityFetch({
    query: patternSiblingsQuery,
    params: { number: pattern.number },
  });

  console.log("Pattern", pattern);

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen gap-y-4">
      <div className="flex gap-x-4">
        {previousPattern && (
          <Link
            href={`/patterns/${previousPattern.slug}`}
            className="underline"
          >
            &laquo; {previousPattern.number}. {previousPattern.name}
          </Link>
        )}
        <Link href="/" className="underline">
          Back to home
        </Link>
        {nextPattern && (
          <Link href={`/patterns/${nextPattern.slug}`} className="underline">
            {nextPattern.number}. {nextPattern.name} &raquo;
          </Link>
        )}
      </div>
      <Pattern pattern={pattern} />
    </div>
  );
}
