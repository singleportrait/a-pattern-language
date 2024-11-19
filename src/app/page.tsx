import { sanityFetch } from "@/sanity/lib/live";
import { allPatternsSlugsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import { Pattern } from "./helpers/types";
// import Image from "next/image";

export default async function Home() {
  const { data: patterns } = await sanityFetch({
    query: allPatternsSlugsQuery,
  });
  console.log("Data", patterns);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>A Pattern Language</h1>
      {patterns.map((pattern: Pattern) => (
        <Link
          key={pattern._id}
          href={`/patterns/${pattern.slug}`}
          className="underline"
        >
          <h2>
            {pattern.number}. {pattern.name}
          </h2>
        </Link>
      ))}
    </div>
  );
}
