import Image from "next/image";
import classNames from "classnames";
import { PatternDto } from "@/app/helpers/types";
import { confidenceDisplay } from "@/app/helpers/confidence";
import BlockContent from "@/app/components/BlockContent";
import { urlFor } from "@/sanity/lib/image";

const TitleWithConfidence = ({ pattern }: { pattern: PatternDto }) => (
  <>
    <div className="w-full flex items-center gap-x-4 h-12">
      <div className="grow border-b-2 border-b-accent" />
      {(pattern.confidence === "medium" || pattern.confidence === "high") && (
        <>
          <div className="font-serif text-8xl text-center bg-accent w-24 leading-[0.1] pt-[2.3rem]">
            {confidenceDisplay(pattern.confidence)}
          </div>
          <div className="grow border-b-2 border-b-accent" />
        </>
      )}
    </div>
    <h1 className="font-serif text-5xl sm:text-8xl text-center leading-tighter pt-8 pb-4 sm:pb-8">
      {pattern.name}
    </h1>
  </>
);

const Pattern = ({ pattern }: { pattern: PatternDto }) => {
  return (
    <div className="flex flex-col items-center md:items-start md:grid md:grid-cols-5 xl:grid-cols-7 md:gap-x-6 max-w-screen-2xl mx-auto gap-y-4">
      <div className="fixed left-8 sm:left-12 bottom-8 sm:bottom-12 font-serif text-10xl sm:text-12xl text-accent-bold leading-[0.75] z-10">
        {pattern.number}
      </div>
      <div className="xl:col-start-2 md:col-span-5 hidden md:block">
        <TitleWithConfidence pattern={pattern} />
      </div>
      {pattern.image && (
        <div className="md:col-span-2 xl:col-start-2">
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
        <TitleWithConfidence pattern={pattern} />
      </div>
      <div
        className={classNames({
          "md:col-span-3 flex flex-col gap-y-10": true,
          "md:col-start-3 xl:col-start-4": pattern.image,
          "md:col-start-2 xl:col-start-3": !pattern.image,
        })}
      >
        {pattern.earlierPatterns && (
          <div className="text-lg leading-snug">
            <BlockContent content={pattern.earlierPatterns} />
          </div>
        )}
        <div className="flex flex-col p-5 bg-accent gap-y-10 items-center">
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
          <div className="space-y-2 text-lg leading-snug">
            <p className="text-base uppercase">Usage:</p>
            <BlockContent content={pattern.laterPatterns} />
          </div>
        )}
      </div>
      <div className="xl:col-start-2 md:col-span-5 w-full flex items-center gap-x-4 py-8">
        <div className="grow border-b-2 border-b-accent" />
        <p>pg. {pattern.page}</p>
        <div className="grow border-b-2 border-b-accent" />
      </div>
    </div>
  );
};

export default Pattern;
