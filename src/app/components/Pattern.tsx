import { PatternDto } from "@/app/helpers/types";
import { confidenceDisplay } from "@/app/helpers/confidence";
import BlockContent from "@/app/components/BlockContent";

const Pattern = ({ pattern }: { pattern: PatternDto }) => {
  return (
    <>
      <h1>
        {pattern.number}. {pattern.name} {confidenceDisplay(pattern.confidence)}
      </h1>
      {pattern.earlierPatterns && (
        <div className="max-w-lg">
          <p>Outline:</p>
          <BlockContent content={pattern.earlierPatterns} />
        </div>
      )}
      <p className="max-w-lg">
        Problem:
        <br />
        {pattern.problem}
      </p>
      <p className="max-w-lg">
        Solution:
        <br />
        {pattern.solution}
      </p>
      {pattern.laterPatterns && (
        <div className="max-w-lg">
          <p>Usage:</p>
          <BlockContent content={pattern.laterPatterns} />
        </div>
      )}
      <p>pg. {pattern.page}</p>
    </>
  );
};

export default Pattern;
