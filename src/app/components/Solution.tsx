import ConfidenceDisplay from "@/app/components/ConfidenceDisplay";

const ConfidenceGuide = () => {
  return (
    <div className="flex justify-center items-stretch gap-x-2 sm:gap-x-4 w-full -mb-8">
      <div className="self-center hidden sm:block grow border-b-2 border-b-accent" />
      <ConfidenceDisplay confidence="high" displayLabel />
      <ConfidenceDisplay confidence="medium" displayLabel />
      <div className="w-26 flex flex-col justify-end">
        <div className="text-2xs uppercase text-center">
          Low Confidence <br />
          (No stars)
        </div>
      </div>
      <div className="self-center hidden sm:block grow border-b-2 border-b-accent" />
    </div>
  );
};

// Display confidence guide inline if solution contains confidence_indicator
const Solution = ({ solution }: { solution: string }) => {
  const inlineComponentRegex = /::/g;
  const confidenceIndicatorRegex = /confidence_indicator/g;
  const solutionSplitByRegex = solution.split(inlineComponentRegex);

  return solutionSplitByRegex.map((part, i) => {
    const matched = confidenceIndicatorRegex.test(part);
    if (matched) return <ConfidenceGuide key={i} />;
    return (
      <p
        key={i}
        className="text-xl sm:text-[1.375rem] leading-snug whitespace-pre-wrap"
      >
        {part}
      </p>
    );
  });
};

export default Solution;
