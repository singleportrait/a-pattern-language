import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import { allPatternsSlugsQuery, patternQuery } from "@/sanity/lib/queries";
import { confidenceDisplay } from "@/app/helpers/confidence";
import Link from "next/link";

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

// export async function generateMetadata(props: Props): Promise<Metadata> {
//   const params = await props.params;
//   const { data: pattern } = await sanityFetch({
//     query: patternQuery,
//     params,
//     stega: false,
//   });

//   return {
//     title: pattern?.name,
//     description: pattern?.problem,
//   } satisfies Metadata;
// }

export default async function Pattern(props: Props) {
  const params = await props.params;
  const [{ data: pattern }] = await Promise.all([
    sanityFetch({ query: patternQuery, params }),
  ]);

  if (!pattern?._id) {
    return notFound();
  }

  console.log("Pattern", pattern);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Link href="/" className="underline">
        Back to home
      </Link>
      <h1>
        {pattern.number}. {pattern.name} {confidenceDisplay(pattern.confidence)}
      </h1>
      <p>pg. {pattern.page}</p>
      <p>Problem: {pattern.problem}</p>
      <p>Solution: {pattern.solution}</p>
    </div>
  );
}
