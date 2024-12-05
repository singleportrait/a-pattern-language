import Link from "next/link";
import { PatternBaseDto } from "@/app/helpers/types";

const Menu = ({
  nextPattern,
  previousPattern,
  isIndex = false,
}: {
  nextPattern?: PatternBaseDto;
  previousPattern?: PatternBaseDto;
  isIndex?: boolean;
}) => {
  return (
    <menu className="fixed z-10 left-0 top-0 bg-accent w-full px-3 flex sm:grid sm:grid-cols-3 justify-between text-sm h-10 items-center">
      {previousPattern ? (
        <Link href={`/patterns/${previousPattern.slug}`}>
          &larr; {previousPattern.number}{" "}
          <span className="hidden sm:inline">{previousPattern.name}</span>
        </Link>
      ) : (
        <div />
      )}
      {isIndex ? (
        <h1 className="uppercase text-center sm:text-right sm:col-span-3">
          A Pattern Language
        </h1>
      ) : (
        <Link href="/" className="uppercase text-center">
          A Pattern Language
        </Link>
      )}
      {nextPattern ? (
        <Link href={`/patterns/${nextPattern.slug}`} className="text-right">
          {nextPattern.number}{" "}
          <span className="hidden sm:inline">{nextPattern.name}</span> &rarr;
        </Link>
      ) : (
        <div />
      )}
    </menu>
  );
};

export default Menu;
