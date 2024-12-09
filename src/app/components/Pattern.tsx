import Link from "next/link";
import classNames from "classnames";
import type { PatternDto } from "@/sanity/lib/definitions";
import BlockContent from "@/app/components/BlockContent";
import TitleWithConfidence from "@/app/components/TitleWithConfidence";
import PageFooter from "@/app/components/PageFooter";
import Solution from "@/app/components/Solution";
import ImageWithMultiply from "@/app/components/ImageWithMultiply";

type PatternProps = {
  pattern: PatternDto;
};

const Pattern = ({ pattern }: PatternProps) => {
  const { previousPattern, nextPattern } = pattern;

  const pageFooterLabel = pattern.isPatternGuide
    ? `pg. # in the book`
    : `pg. ${pattern.page}`;

  return (
    <div className="sidebar_grid_wrapper pt-2">
      <div className="sidebar_grid">
        <div className="fixed pointer-events-none left-2 sm:left-68 top-10 sm:top-auto sm:bottom-12 font-number text-10xl sm:text-12xl text-accent-bold leading-[0.75] z-10 mix-blend-multiply">
          {pattern.number}
        </div>
        <div className="sidebar_grid_span_8 hidden md:block">
          <TitleWithConfidence
            title={pattern.name}
            confidence={pattern.confidence}
            displayLabel
          />
        </div>
        {pattern.image && (
          <div className="sidebar_grid_left_column">
            <div className="p-4 bg-accent">
              <ImageWithMultiply
                image={pattern.image}
                alt={`${pattern.number}. ${pattern.name} image`}
              />
            </div>
          </div>
        )}
        <div className="w-full block md:hidden">
          <TitleWithConfidence
            title={pattern.name}
            confidence={pattern.confidence}
          />
        </div>
        <div
          className={classNames({
            "flex flex-col gap-y-8": true,
            "lg:col-span-5 lg:col-start-4 xl:col-start-5": pattern.image,
            "lg:col-span-6 lg:col-start-2 xl:col-start-3": !pattern.image,
          })}
        >
          {pattern.earlierPatterns && (
            <BlockContent
              content={pattern.earlierPatterns}
              classNames="sm:text-lg/normal"
            />
          )}
          <div className="flex flex-col -mx-5 sm:mx-0 p-5 bg-accent-highlight gap-y-10 items-center">
            <div className="flex flex-col gap-y-2 w-full">
              <p className="eyebrow">Problem:</p>
              <p className="sm:text-lg">{pattern.problem}</p>
            </div>
            {pattern.isPatternGuide && (
              <div className="flex flex-col gap-y-2 w-full text-accent-text">
                <p className="eyebrow">
                  Problem Body—Not Included on the site! Go read the book!
                </p>
                <p className="sm:text-lg">
                  After the headline comes the body of the problem. This is the
                  longest section. It describes the empirical background of the
                  pattern, the evidence for its validity, the range of different
                  ways the pattern can be manifested in a building, and so on.
                </p>
              </div>
            )}
            <div className="flex flex-col gap-y-2 w-full">
              <p className="eyebrow">Solution:</p>
              <Solution solution={pattern.solution} />
            </div>
            {pattern.diagram && (
              <ImageWithMultiply
                image={pattern.diagram}
                alt={`${pattern.number}. ${pattern.name} diagram`}
              />
            )}
          </div>
          {pattern.laterPatterns && (
            <div className="space-y-2">
              <p className="eyebrow">Usage:</p>
              <BlockContent
                content={pattern.laterPatterns}
                classNames="sm:text-lg/normal"
              />
            </div>
          )}
        </div>
        <PageFooter label={pageFooterLabel} classNames="sidebar_grid_span_8" />
        {(previousPattern || nextPattern) && (
          <div className="sidebar_grid_span_8 w-full">
            <div className="flex w-full justify-between">
              {previousPattern ? (
                <Link href={`/patterns/${previousPattern.slug}`}>
                  &larr; {previousPattern.number}{" "}
                  <span className="hidden sm:inline">
                    {previousPattern.name}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {nextPattern ? (
                <Link
                  href={`/patterns/${nextPattern.slug}`}
                  className="text-right"
                >
                  {nextPattern.number}{" "}
                  <span className="hidden sm:inline">{nextPattern.name}</span>{" "}
                  &rarr;
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pattern;
