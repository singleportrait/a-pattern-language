import Link from "next/link";
import { PatternInlineReferenceBlockDto } from "./types";

export const portableTextComponents = {
  types: {
    patternReference: ({
      value,
    }: {
      value: PatternInlineReferenceBlockDto;
    }) => {
      return (
        <Link
          href={`/patterns/${value.slug}`}
          className="uppercase text-base bg-amber-50 p-0.5 rounded mx-px hover:bg-amber-200 transition-colors"
        >
          {value.name} <span className="text-stone-500">{value.number}</span>
        </Link>
      );
    },
  },
};
