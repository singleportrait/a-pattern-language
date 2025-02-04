import { Fragment } from 'react';
import classNames from 'classnames';
import type { Metadata } from 'next';
import { sanityFetch } from '@/sanity/lib/live';
import { notFound } from 'next/navigation';
import {
  allPagesQuery,
  pageBySlugQuery,
  type PageBaseDto,
  type PageDto,
} from '@/sanity/lib/definitions';
import TitleWithConfidence from '@/app/components/TitleWithConfidence';
import BlockContent from '@/app/components/BlockContent';
import PageBorder from '@/app/components/PageFooter';
import SectionSidebar from '@/app/components/SectionSidebar';
import ImageWithMultiply from '@/app/components/ImageWithMultiply';

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
    // description: page?.content, // TODO: Turn block content into text
  } satisfies Metadata;
}

export default async function PagePage(props: Props) {
  const params = await props.params;
  const { data: page }: { data: PageDto } = await sanityFetch({
    query: pageBySlugQuery,
    params,
  });

  if (!page?._id) return notFound();

  // console.log("Page", page);

  return (
    <>
      <div className="content_grid_wrapper pt-2">
        <div className="content_grid">
          <div className="content_grid_span_8">
            <TitleWithConfidence title={page.name} confidence="high" displayLabel />
          </div>
          <div className="content_grid_span_6">
            <BlockContent content={page.content} />
          </div>
          {page.sections &&
            page.sections.length > 0 &&
            page.sections.map(section => (
              <Fragment key={section._id}>
                <div
                  className={classNames({
                    'content_grid_span_8 w-full': true,
                    'pt-16': section.name,
                  })}
                  id={section.slug}
                >
                  <TitleWithConfidence
                    title={section.name}
                    confidence={section.name ? 'high' : 'low'}
                    titleSize="small"
                  />
                </div>
                {section.image && (
                  <>
                    <div className="content_grid_left_column">
                      <div className="p-4 bg-accent-200">
                        <ImageWithMultiply image={section.image} alt={`${section.name} image`} />
                      </div>
                    </div>
                    <div className="content_grid_right_column pt-4 lg:pt-0">
                      <BlockContent content={section.content} />
                    </div>
                  </>
                )}
                {!section.image && (
                  <div className="content_grid_span_8">
                    <BlockContent content={section.content} />
                  </div>
                )}
              </Fragment>
            ))}
          <PageBorder label={page.page} classNames="content_grid_span_8" />
        </div>
      </div>
      <SectionSidebar sections={[page.sidebarSection]} showType="items" linkSectionName={false} />
    </>
  );
}
