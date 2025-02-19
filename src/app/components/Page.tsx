import { Fragment } from 'react';
import classNames from 'classnames';
import { PageDto, Confidence } from '@/sanity/lib/definitions';
import TitleWithConfidence from '@/app/components/TitleWithConfidence';
import BlockContent from '@/app/components/BlockContent';
import PageBorder from '@/app/components/PageBorder';
import SectionSidebar from '@/app/components/SectionSidebar';
import ImageWithMultiply from '@/app/components/ImageWithMultiply';

type PageProps = {
  page: PageDto;
};

const Page = ({ page }: PageProps) => {
  return (
    <>
      <div className="content_grid_wrapper pt-2">
        <div className="content_grid">
          <div className="content_grid_span_8">
            <TitleWithConfidence title={page.name} confidence={Confidence.High} displayLabel />
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
                    confidence={section.name ? Confidence.High : Confidence.Low}
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
};

export default Page;
