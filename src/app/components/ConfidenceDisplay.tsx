import { confidenceDisplay } from "@/app/helpers/confidence";

type ConfidenceDisplayProps = {
  confidence: "low" | "medium" | "high";
  displayLabel?: boolean;
};

const ConfidenceDisplay = ({
  confidence,
  displayLabel = false,
}: ConfidenceDisplayProps) => {
  return (
    <div className="bg-accent w-26 py-1 flex flex-col items-center rounded-xl">
      <div className="font-serif text-8xl text-center leading-[0.1] pt-[2.3rem]">
        {confidenceDisplay(confidence)}
      </div>
      {displayLabel && (
        <div className="text-2xs uppercase">{confidence} Confidence</div>
      )}
    </div>
  );
};

export default ConfidenceDisplay;