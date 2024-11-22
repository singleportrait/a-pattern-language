import { confidenceDisplay } from "@/app/helpers/confidence";

// TODO: Add hover state (and disable it on the index page)
const TitleWithConfidence = ({
  title,
  confidence,
}: {
  title: string;
  confidence: "low" | "medium" | "high";
}) => (
  <>
    <div className="w-full flex items-center gap-x-4 h-12">
      <div className="grow border-b-2 border-b-accent" />
      {(confidence === "medium" || confidence === "high") && (
        <>
          <div className="font-serif text-8xl text-center bg-accent w-24 leading-[0.1] pt-[2.3rem]">
            {confidenceDisplay(confidence)}
          </div>
          <div className="grow border-b-2 border-b-accent" />
        </>
      )}
    </div>
    <h1 className="font-serif text-5xl sm:text-8xl text-center leading-tighter pt-8 pb-4 sm:pb-8">
      {title}
    </h1>
  </>
);

export default TitleWithConfidence;
