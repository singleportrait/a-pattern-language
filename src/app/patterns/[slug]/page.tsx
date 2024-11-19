import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import { allPatternsSlugsQuery, patternQuery } from "@/sanity/lib/queries";
import Pattern from "@/app/components/Pattern";

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
    query: patternQuery,
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
  const [{ data: pattern }] = await Promise.all([
    sanityFetch({ query: patternQuery, params }),
  ]);

  if (!pattern?._id) {
    return notFound();
  }

  console.log("Pattern", pattern);

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen gap-y-4">
      <Link href="/" className="underline">
        Back to home
      </Link>
      <Pattern pattern={pattern} />
    </div>
  );
}
