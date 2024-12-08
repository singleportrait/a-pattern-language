import ConfidenceDisplay from "@/app/components/ConfidenceDisplay";
import classNames from "classnames";

type TitleWithConfidenceProps = {
  title?: string;
  confidence: "low" | "medium" | "high";
  titleSize?: "large" | "small";
  displayLabel?: boolean;
};

const TitleWithConfidence = ({
  title,
  confidence,
  titleSize = "large",
  displayLabel = false,
}: TitleWithConfidenceProps) => (
  <>
    <div className="w-full flex items-center gap-x-4 h-12">
      <div className="grow border-b-2 border-b-accent" />
      {(confidence === "medium" || confidence === "high") && (
        <>
          <ConfidenceDisplay
            confidence={confidence}
            displayLabel={displayLabel}
          />
          <div className="grow border-b-2 border-b-accent" />
        </>
      )}
    </div>
    {title && (
      <h1
        className={classNames({
          "font-serif text-center leading-tighter pt-8 pb-4 sm:pb-8": true,
          "text-5xl sm:text-6xl md:text-7xl lg:text-8xl": titleSize === "large",
          "text-4xl sm:text-5xl": titleSize === "small",
        })}
      >
        {title}
      </h1>
    )}
  </>
);

export default TitleWithConfidence;
