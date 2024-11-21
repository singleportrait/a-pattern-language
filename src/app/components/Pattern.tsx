import Image from "next/image";
import { PatternDto } from "@/app/helpers/types";
import { confidenceDisplay } from "@/app/helpers/confidence";
import BlockContent from "@/app/components/BlockContent";
import { urlFor } from "@/sanity/lib/image";

const Pattern = ({ pattern }: { pattern: PatternDto }) => {
  return (
    <>
      {pattern.image && (
        <Image
          src={urlFor(pattern.image).width(800).url() || ""}
          alt={`${pattern.number}. ${pattern.name} image`}
          width={400}
          height={400}
        />
      )}
      <h1>
        {pattern.number}. {pattern.name} {confidenceDisplay(pattern.confidence)}
      </h1>
      {pattern.earlierPatterns && (
        <div className="w-128 max-w-full">
          <BlockContent content={pattern.earlierPatterns} />
        </div>
      )}
      <br />
      <div className="w-128 max-w-full">
        <p className="uppercase text-[0.95rem]">Problem:</p>
        <h2 className="h3">{pattern.problem}</h2>
      </div>
      <br />
      <div className="w-128 max-w-full">
        <p className="uppercase text-[0.95rem]">Solution:</p>
        <h2 className="h2">{pattern.solution}</h2>
      </div>
      {pattern.diagram && (
        <Image
          src={urlFor(pattern.diagram).width(800).url() || ""}
          alt={`${pattern.number}. ${pattern.name} diagram`}
          width={400}
          height={400}
        />
      )}
      <br />
      {pattern.laterPatterns && (
        <div className="w-128 max-w-full">
          <p className="uppercase text-[0.95rem]">Usage:</p>
          <BlockContent content={pattern.laterPatterns} />
        </div>
      )}
      <p>pg. {pattern.page}</p>
    </>
  );
};

export default Pattern;
