import Image from "next/image";
import classNames from "classnames";
import { PatternDto } from "@/app/helpers/types";
import BlockContent from "@/app/components/BlockContent";
import TitleWithConfidence from "@/app/components/TitleWithConfidence";
import { urlFor } from "@/sanity/lib/image";

const Pattern = ({ pattern }: { pattern: PatternDto }) => {
  return (
    <div className="gridWrapper">
      {/* <div className="fixed left-8 sm:left-12 bottom-8 sm:bottom-12 font-number text-[15rem] sm:text-[25rem] text-accent-bold leading-[0.85] z-10"> */}
      <div className="fixed left-8 sm:left-12 bottom-8 sm:bottom-12 font-number text-10xl sm:text-12xl text-accent-bold leading-[0.75] z-10">
        {pattern.number}
      </div>
      <div className="gridColSpanContent hidden md:block">
        <TitleWithConfidence
          title={pattern.name}
          confidence={pattern.confidence}
        />
      </div>
      {pattern.image && (
        <div className="gridLeftCol">
          <div className="p-5 bg-accent">
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
      <div className="block md:hidden">
        <TitleWithConfidence
          title={pattern.name}
          confidence={pattern.confidence}
        />
      </div>
      <div
        className={classNames({
          "gridRightCol flex flex-col gap-y-10": true,
          "md:col-start-3 xl:col-start-4": pattern.image,
          "md:col-start-2 xl:col-start-3": !pattern.image,
        })}
      >
        {pattern.earlierPatterns && (
          <div className="text-lg leading-normal">
            <BlockContent content={pattern.earlierPatterns} />
          </div>
        )}
        <div className="flex flex-col -mx-5 p-5 bg-accent gap-y-10 items-center">
          <div className="space-y-2">
            <p className="uppercase">Problem:</p>
            <p className="text-lg leading-snug">{pattern.problem}</p>
          </div>
          <div className="space-y-2">
            <p className="uppercase">Solution:</p>
            <p className="text-[1.35rem] leading-snug whitespace-pre-wrap">
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
          <div className="space-y-2 text-lg leading-normal">
            <p className="text-base uppercase">Usage:</p>
            <BlockContent content={pattern.laterPatterns} />
          </div>
        )}
      </div>
      <div className="gridColSpanContent w-full flex items-center gap-x-4 py-8">
        <div className="grow border-b-2 border-b-accent" />
        <p>pg. {pattern.page}</p>
        <div className="grow border-b-2 border-b-accent" />
      </div>
    </div>
  );
};

export default Pattern;
