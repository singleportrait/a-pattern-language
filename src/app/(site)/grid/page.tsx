import { sanityFetch } from '@/sanity/lib/live';
import {
  allPatternsWithReferencesQuery,
  type PatternBaseWithReferencesDto,
} from '@/sanity/lib/definitions';
import { addReferenceCounts, generateLinksDataForD3 } from '@/app/helpers/referenceCounts';
import PatternsGrid from '@/app/components/PatternsGrid';
import { Suspense } from 'react';

export const metadata = {
  title: 'Grid View',
};

export default async function Grid() {
  const { data: patterns }: { data: PatternBaseWithReferencesDto[] } = await sanityFetch({
    query: allPatternsWithReferencesQuery,
  });

  // TODO: Do this as pre-formatting somewhere
  addReferenceCounts(patterns);
  console.log('Patterns', patterns);

  // const dataForD3 = generateDataForD3(patterns);
  const dataForD3 = generateLinksDataForD3(patterns, 31, true);
  console.log('Data pattern 31 for D3', dataForD3);

  const data = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataForD3));

  return (
    <>
      <div className="max-w-(--breakpoint-xl) mx-auto">
        {dataForD3 && (
          <a
            id="downloadAnchorElem"
            href={`data:${data}`}
            download="data.json"
            className="bg-accent-200 text-black p-2 rounded-md mb-4 mx-auto inline-block"
          >
            Download JSON
          </a>
        )}
        <Suspense>
          <PatternsGrid patterns={patterns} />
        </Suspense>
      </div>
    </>
  );
}
