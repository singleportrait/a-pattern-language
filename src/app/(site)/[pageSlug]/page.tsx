import type { Metadata } from 'next';
import { sanityFetch } from '@/sanity/lib/live';
import { notFound } from 'next/navigation';
import {
  allPagesQuery,
  pageBySlugQuery,
  type PageBaseDto,
  type PageDto,
} from '@/sanity/lib/definitions';
import portableTextToPlainText from '@/app/helpers/portableTextToPlainText';
import Page from '@/app/components/Page';

type Props = {
  params: Promise<{ pageSlug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: allPagesQuery,
    perspective: 'published',
    stega: false,
  });
  return data;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: page }: { data: PageBaseDto } = await sanityFetch({
    query: pageBySlugQuery,
    params,
    stega: false,
  });

  return {
    title: page?.name,
    description: portableTextToPlainText(page?.content),
  } satisfies Metadata;
}

export default async function PagePage(props: Props) {
  const params = await props.params;
  const { data: page }: { data: PageDto } = await sanityFetch({
    query: pageBySlugQuery,
    params,
  });

  if (!page?._id) return notFound();

  return <Page page={page} />;
}
