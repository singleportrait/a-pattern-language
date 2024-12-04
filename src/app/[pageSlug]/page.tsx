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
import { Fragment } from "react";

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
      <div className="px-8 py-12 min-h-screen">
        <div className="flex flex-col items-center md:items-start sm:ml-40 md:ml-auto md:grid md:grid-cols-12 xl:grid-cols-9 xl:max-w-screen-lg md:gap-x-10 mx-auto gap-y-4">
          <div className="md:col-span-8 md:col-start-4 xl:col-start-2">
            <TitleWithConfidence title={page.name} confidence="high" />
          </div>
          <div className="md:col-span-6 md:col-start-5 xl:col-start-3">
            <BlockContent content={page.content} />
          </div>
          {page.sections &&
            page.sections.length > 0 &&
            page.sections.map((section) => (
              <Fragment key={section._id}>
                <div
                  className="md:col-span-8 md:col-start-4 xl:col-start-2 mt-12"
                  id={section.slug}
                >
                  <TitleWithConfidence
                    title={section.name}
                    confidence="high"
                    titleSize="small"
                  />
                </div>
                {section.image && (
                  <>
                    <div className="md:col-span-3 md:col-start-4 xl:col-start-2">
                      <div className="p-5 bg-accent">
                        <Image
                          src={urlFor(section.image).width(1000).url() || ""}
                          alt={`${section.name} image`}
                          width={500}
                          height={500}
                          className="mix-blend-multiply"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-5 md:col-start-7 xl:col-start-5">
                      <BlockContent content={section.content} />
                    </div>
                  </>
                )}
                {!section.image && (
                  <div className="md:col-span-8 md:col-start-4 xl:col-start-2">
                    <BlockContent content={section.content} />
                  </div>
                )}
              </Fragment>
            ))}
        </div>
        <div className="hidden sm:block fixed w-2/12 min-w-36 bg-accent h-screen top-8 left-0 p-6">
          Sidebar
        </div>
      </div>
    </>
  );
}
