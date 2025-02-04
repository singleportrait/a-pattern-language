import Link from 'next/link';
import classNames from 'classnames';
import type { PatternDto } from '@/sanity/lib/definitions';
import BlockContent from '@/app/components/BlockContent';
import TitleWithConfidence from '@/app/components/TitleWithConfidence';
import PageBorder from '@/app/components/PageFooter';
import Solution from '@/app/components/Solution';
import ImageWithMultiply from '@/app/components/ImageWithMultiply';

type PatternProps = {
  pattern: PatternDto;
};

const Pattern = ({ pattern }: PatternProps) => {
  const { previousPattern, nextPattern } = pattern;

  const pageFooterLabel = pattern.isPatternGuide ? `pg. # in the book` : `pg. ${pattern.page}`;

  return (
    <div className="content_grid_wrapper pt-2">
      <div className="content_grid">
        <div className="fixed pointer-events-none left-2 sm:left-8 top-10 md:top-auto md:bottom-12 font-number text-10xl md:text-12xl text-accent-400 leading-[0.75] z-10 mix-blend-multiply">
          {pattern.number}
        </div>
        <div className="content_grid_span_8 hidden md:block">
          <TitleWithConfidence title={pattern.name} confidence={pattern.confidence} displayLabel />
        </div>
        {pattern.image && (
          <div className="content_grid_left_column">
            <div className="p-4 bg-accent-200">
              <ImageWithMultiply
                image={pattern.image}
                alt={`${pattern.number}. ${pattern.name} image`}
              />
            </div>
          </div>
        )}
        <div className="w-full block md:hidden">
          <TitleWithConfidence title={pattern.name} confidence={pattern.confidence} />
        </div>
        <div
          className={classNames({
            'flex flex-col gap-y-8': true,
            'md:col-span-5 md:col-start-4 lg:col-start-5': pattern.image,
            'md:col-span-6 md:col-start-2 lg:col-start-3': !pattern.image,
          })}
        >
          {pattern.earlierPatterns && (
            <BlockContent content={pattern.earlierPatterns} classNames="sm:text-lg/normal" />
          )}
          <div className="flex flex-col -mx-5 sm:mx-0 p-5 bg-accent-100 gap-y-10 items-center">
            <div className="flex flex-col gap-y-2 w-full">
              <p className="eyebrow">Problem:</p>
              <p className="sm:text-lg/normal whitespace-pre-wrap">{pattern.problem}</p>
            </div>
            {pattern.isPatternGuide && (
              <div className="flex flex-col gap-y-2 w-full text-accent-500">
                <p className="eyebrow">Problem Body—Not Included on the site! Go read the book!</p>
                <p className="sm:text-lg/normal">
                  After the headline comes the body of the problem. This is the longest section. It
                  describes the empirical background of the pattern, the evidence for its validity,
                  the range of different ways the pattern can be manifested in a building, and so
                  on.
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
              <BlockContent content={pattern.laterPatterns} classNames="sm:text-lg/normal" />
            </div>
          )}
        </div>
        <PageBorder label={pageFooterLabel} classNames="content_grid_span_8" />
        {(previousPattern || nextPattern) && (
          <div className="content_grid_span_8 w-full">
            <div className="flex w-full justify-between">
              {previousPattern ? (
                <Link href={`/patterns/${previousPattern.slug}`}>
                  &larr; {previousPattern.number}{' '}
                  <span className="hidden sm:inline">{previousPattern.name}</span>
                </Link>
              ) : (
                <div />
              )}
              {nextPattern ? (
                <Link href={`/patterns/${nextPattern.slug}`} className="text-right">
                  {nextPattern.number} <span className="hidden sm:inline">{nextPattern.name}</span>{' '}
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
