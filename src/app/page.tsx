import { sanityFetch } from "@/sanity/lib/live";
import { sectionsQuery } from "@/sanity/lib/queries";
import { SectionDto } from "@/app/helpers/types";
import Menu from "@/app/components/Menu";
import Index from "./components/Index";

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
      <Menu isIndex />
      <Index sections={sections} />
    </>
  );
}
