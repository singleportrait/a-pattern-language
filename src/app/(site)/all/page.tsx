import { sanityFetch } from "@/sanity/lib/live";
import {
  allPatternsWithTextContentQuery,
  PatternWithTextContentDto,
} from "@/sanity/lib/definitions";
import BlockContent from "@/app/components/BlockContent";

export const metadata = {
  title: "A Pattern Language",
};

export default async function AllContent() {
  const { data: patterns }: { data: PatternWithTextContentDto[] } =
    await sanityFetch({
      query: allPatternsWithTextContentQuery,
    });

  return (
    <div className="max-w-screen-xl mx-auto px-4 flex flex-col gap-y-8">
      {patterns.map((pattern) => (
        <div key={pattern.number} className="flex flex-col gap-y-4">
          <h2 className="text-2xl font-bold">{pattern.name}</h2>
          <div>
            <small>Earlier patterns</small>
            <BlockContent content={pattern.earlierPatterns} />
          </div>
          <div>
            <small>Problem</small>
            <p>{pattern.problem}</p>
          </div>
          <div>
            <small>Solution</small>
            <p>{pattern.solution}</p>
          </div>
          <div>
            <small>Later patterns</small>
            <BlockContent content={pattern.laterPatterns} />
          </div>
        </div>
      ))}
    </div>
  );
}
