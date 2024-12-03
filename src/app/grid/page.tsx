import { sanityFetch } from "@/sanity/lib/live";
import { allPatternsWithReferencesPatternsQuery } from "@/sanity/lib/queries";
import { PatternBaseWithReferencesDto } from "@/app/helpers/types";
import {
  addReferenceCounts,
  generateLinksDataForD3,
} from "@/app/helpers/referenceCounts";
import Menu from "@/app/components/Menu";
import PatternsGrid from "../components/PatternsGrid";
import { Suspense } from "react";

export const metadata = {
  title: "Grid – A Pattern Language",
};

export default async function Grid() {
  const { data: patterns }: { data: PatternBaseWithReferencesDto[] } =
    await sanityFetch({
      query: allPatternsWithReferencesPatternsQuery,
    });

  // TODO: Do this as pre-formatting somewhere
  addReferenceCounts(patterns);
  console.log("Patterns", patterns);

  // const dataForD3 = generateDataForD3(patterns);
  const dataForD3 = generateLinksDataForD3(patterns, 31);
  console.log("Data pattern 31 for D3", dataForD3);

  const data =
    "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataForD3));

  return (
    <>
      <Menu />
      <div className="py-12 max-w-screen-xl mx-auto px-4">
        {dataForD3 && (
          <a
            id="downloadAnchorElem"
            href={`data:${data}`}
            download="data.json"
            className="bg-accent text-black p-2 rounded-md mb-4 mx-auto inline-block"
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
