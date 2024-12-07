import { Fragment } from "react";
import classNames from "classnames";
import type { Metadata } from "next";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import { allPagesSlugsQuery, pageSlugQuery } from "@/sanity/lib/queries";
import Menu from "@/app/components/Menu";
import { PageBaseDto, PageDto } from "@/app/helpers/types";
import TitleWithConfidence from "@/app/components/TitleWithConfidence";
import BlockContent from "@/app/components/BlockContent";
import PageFooter from "@/app/components/PageFooter";
import SectionSidebar from "@/app/components/SectionSidebar";

type Props = {
  params: Promise<{ pageSlug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: allPagesSlugsQuery,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: page }: { data: PageBaseDto } = await sanityFetch({
    query: pageSlugQuery,
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
    query: pageSlugQuery,
    params,
  });

  if (!page?._id) return notFound();

  // console.log("Page", page);

  return (
    <>
      <Menu />
      <div className="sidebar_grid_wrapper">
        <div className="sidebar_grid">
          <div className="sidebar_grid_span_8">
            <TitleWithConfidence title={page.name} confidence="high" />
          </div>
          <div className="sidebar_grid_span_6">
            <BlockContent content={page.content} />
          </div>
          {page.sections &&
            page.sections.length > 0 &&
            page.sections.map((section) => (
              <Fragment key={section._id}>
                <div
                  className={classNames({
                    "sidebar_grid_span_8 w-full": true,
                    "pt-16": section.name,
                  })}
                  id={section.slug}
                >
                  <TitleWithConfidence
                    title={section.name}
                    confidence={section.name ? "high" : "low"}
                    titleSize="small"
                  />
                </div>
                {section.image && (
                  <>
                    <div className="sidebar_grid_left_column">
                      <div className="p-4 bg-accent">
                        <Image
                          src={urlFor(section.image).width(1000).url() || ""}
                          alt={`${section.name} image`}
                          width={500}
                          height={500}
                          className="mix-blend-multiply"
                        />
                      </div>
                    </div>
                    <div className="sidebar_grid_right_column pt-4 lg:pt-0">
                      <BlockContent content={section.content} />
                    </div>
                  </>
                )}
                {!section.image && (
                  <div className="sidebar_grid_span_8">
                    <BlockContent content={section.content} />
                  </div>
                )}
              </Fragment>
            ))}
          <PageFooter label={page.page} classNames="sidebar_grid_span_8" />
        </div>
      </div>
      <SectionSidebar
        sections={[page.sidebarSection]}
        selectedSection=""
        showType="items"
        linkSectionName={false}
      />
    </>
  );
}
