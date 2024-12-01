import { sanityFetch } from "@/sanity/lib/live";
import { allPatternsWithReferencesPatternsQuery } from "@/sanity/lib/queries";
import { PatternBaseWithReferencesDto } from "@/app/helpers/types";
import { addReferenceCounts } from "@/app/helpers/referenceCounts";
import Menu from "@/app/components/Menu";
import PatternsGrid from "../components/PatternsGrid";
import { Suspense } from "react";

export const metadata = {
  title: "A Pattern Language",
};

export default async function Grid() {
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
      <div className="py-12 max-w-screen-xl mx-auto px-4">
        <Suspense>
          <PatternsGrid patterns={patterns} />
        </Suspense>
      </div>
    </>
  );
}
