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
        <Link href={`/patterns/${value.slug}`} className="reference_highlight">
          {value.name} <span className="text-stone-500">{value.number}</span>
        </Link>
      );
    },
  },
};
