import { sanityFetch } from "@/sanity/lib/live";
import { allPatternsSlugsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import { PatternDto } from "./helpers/types";
import { confidenceDisplay } from "./helpers/confidence";
// import Image from "next/image";

export default async function Home() {
  const { data: patterns } = await sanityFetch({
    query: allPatternsSlugsQuery,
  });
  console.log("Data", patterns);
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen gap-y-4">
      <h1>A Pattern Language</h1>
      {patterns.map((pattern: PatternDto) => (
        <Link
          key={pattern._id}
          href={`/patterns/${pattern.slug}`}
          className="underline"
        >
          <h2>
            {pattern.number}. {pattern.name}{" "}
            {confidenceDisplay(pattern.confidence)}
          </h2>
        </Link>
      ))}
    </div>
  );
}
