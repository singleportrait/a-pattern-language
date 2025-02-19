import { sanityFetch } from '@/sanity/lib/live';
import { sectionsQuery, type SectionDto } from '@/sanity/lib/definitions';
import Index from '@/app/components/Index';

export default async function Home() {
  const { data: sections }: { data: SectionDto[] } = await sanityFetch({
    query: sectionsQuery,
  });

  return <Index sections={sections} />;
}
