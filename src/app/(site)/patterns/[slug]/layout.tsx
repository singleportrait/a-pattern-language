import PatternsSidebar from "@/app/components/PatternsSidebar";
import { sanityFetch } from "@/sanity/lib/live";
import { SectionDto } from "@/app/helpers/types";
import { sectionsQuery } from "@/sanity/lib/queries";

type Props = {
  children: React.ReactNode;
};

export default async function PatternLayout(props: Props) {
  const { data: sections }: { data: SectionDto[] } = await sanityFetch({
    query: sectionsQuery,
  });

  return (
    <>
      {props.children}
      <PatternsSidebar sections={sections} />
    </>
  );
}
