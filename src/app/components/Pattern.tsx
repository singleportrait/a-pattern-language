import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { PatternBaseDto, PatternDto } from "@/app/helpers/types";
import BlockContent from "@/app/components/BlockContent";
import TitleWithConfidence from "@/app/components/TitleWithConfidence";
import { urlFor } from "@/sanity/lib/image";
import PageFooter from "@/app/components/PageFooter";

type PatternProps = {
  pattern: PatternDto;
  nextPattern?: PatternBaseDto;
  previousPattern?: PatternBaseDto;
};

const Pattern = ({ pattern, previousPattern, nextPattern }: PatternProps) => {
  return (
    <div className="sidebar_grid_wrapper">
      <div className="sidebar_grid">
        <div className="fixed pointer-events-none left-8 sm:left-68 top-14 sm:top-auto sm:bottom-12 font-number text-10xl sm:text-12xl text-accent-bold leading-[0.75] z-10 mix-blend-multiply">
          {pattern.number}
        </div>
        <div className="sidebar_grid_span_8 hidden md:block">
          <TitleWithConfidence
            title={pattern.name}
            confidence={pattern.confidence}
          />
        </div>
        {pattern.image && (
          <div className="sidebar_grid_left_column">
            <div className="p-4 bg-accent">
              <Image
                src={urlFor(pattern.image).width(1000).url() || ""}
                alt={`${pattern.number}. ${pattern.name} image`}
                width={500}
                height={500}
                className="mix-blend-multiply"
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
            <div className="space-y-2 w-full">
              <p className="eyebrow">Problem:</p>
              <p className="sm:text-lg">{pattern.problem}</p>
            </div>
            <div className="space-y-2 w-full">
              <p className="eyebrow">Solution:</p>
              <p className="text-xl sm:text-[1.375rem] leading-snug whitespace-pre-wrap">
                {pattern.solution}
              </p>
            </div>
            {pattern.diagram && (
              <Image
                src={urlFor(pattern.diagram).width(800).url() || ""}
                alt={`${pattern.number}. ${pattern.name} diagram`}
                width={400}
                height={400}
                className="mix-blend-multiply"
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
        <PageFooter
          label={`pg. ${pattern.page}`}
          classNames="sidebar_grid_span_8"
        />
        <div className="sidebar_grid_span_8 w-full">
          <div className="flex w-full justify-between">
            {previousPattern ? (
              <Link href={`/patterns/${previousPattern.slug}`}>
                &larr; {previousPattern.number}{" "}
                <span className="hidden sm:inline">{previousPattern.name}</span>
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
      </div>
    </div>
  );
};

export default Pattern;
