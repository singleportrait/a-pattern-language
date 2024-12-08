import { sanityFetch } from "@/sanity/lib/live";
import { sectionsQuery, type SectionDto } from "@/sanity/lib/definitions";
import Index from "@/app/components/Index";

export const metadata = {
  title: "A Pattern Language",
};

export default async function Home() {
  const { data: sections }: { data: SectionDto[] } = await sanityFetch({
    query: sectionsQuery,
  });

  // TODO: Add reference counts onto section patterns and/or merge with all patterns
  // console.log("Sections", sections);

  return (
    <>
      <Index sections={sections} />
    </>
  );
}
