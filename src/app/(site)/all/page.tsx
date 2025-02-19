import { sanityFetch } from '@/sanity/lib/live';
import {
  allPatternsWithTextContentQuery,
  PatternWithTextContentDto,
} from '@/sanity/lib/definitions';
import BlockContent from '@/app/components/BlockContent';
import Link from 'next/link';

export const metadata = {
  title: 'All',
};

export default async function AllContent() {
  const { data: patterns }: { data: PatternWithTextContentDto[] } = await sanityFetch({
    query: allPatternsWithTextContentQuery,
  });

  return (
    <div className="max-w-(--breakpoint-xl) mx-auto px-4 flex flex-col gap-y-8">
      {patterns.map(pattern => (
        <div key={pattern.number} className="flex flex-col gap-y-4">
          <Link
            href={`/patterns/${pattern.slug}`}
            className="hover:underline hover:underline-offset-2"
          >
            <h2 className="text-2xl font-bold">
              {pattern.number}. {pattern.name}
            </h2>
          </Link>
          <div>
            <small>Earlier patterns</small>
            <BlockContent content={pattern.earlierPatterns} />
          </div>
          <div>
            <small>Problem</small>
            <p className="whitespace-pre-wrap">{pattern.problem}</p>
          </div>
          <div>
            <small>Solution</small>
            <p className="whitespace-pre-wrap">{pattern.solution}</p>
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
