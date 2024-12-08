import { confidenceDisplay } from "@/app/helpers/confidence";
import classNames from "classnames";

type TitleWithConfidenceProps = {
  title?: string;
  confidence: "low" | "medium" | "high";
  titleSize?: "large" | "small";
  displayLabel?: boolean;
};

// TODO: Add hover state (and disable it on the index page)
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
          <div className="bg-accent w-26 py-1 flex flex-col items-center rounded-xl">
            <div className="font-serif text-8xl text-center leading-[0.1] pt-[2.3rem]">
              {confidenceDisplay(confidence)}
            </div>
            {displayLabel && (
              <div className="text-2xs uppercase">{confidence} Confidence</div>
            )}
          </div>
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
