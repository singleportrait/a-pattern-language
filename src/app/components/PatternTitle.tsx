import classNames from "classnames";

// import { confidenceDisplay } from "@/app/helpers/confidence";

type PatternTitleProps = {
  number: number | string;
  name: string;
  noUnderline?: boolean;
  addPeriod?: boolean;
  minimal?: boolean;
};

const PatternTitle = ({
  number,
  name,
  noUnderline = false,
  addPeriod = true,
  minimal = false,
}: PatternTitleProps) =>
  minimal ? (
    <>
      <div className="w-8 shrink-0">
        {number}
        {addPeriod ? "." : ""}
      </div>
      <div className="group-hover:underline">{name}</div>
    </>
  ) : (
    <h4 className="flex text-lg py-0.5 pl-8 sm:pl-12">
      <div className="w-12 shrink-0">
        {number}
        {addPeriod ? "." : ""}
      </div>
      <div
        className={classNames({
          "group-hover:underline underline-offset-2": true,
          underline: !noUnderline,
        })}
      >
        {name}
      </div>
      {/* &nbsp; */}
      {/* {confidenceDisplay(pattern.confidence)} */}
    </h4>
  );

export default PatternTitle;
