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
        <Link href={`/patterns/${value.slug}`} className="underline">
          {value.name} ({value.number})
        </Link>
      );
    },
  },
};
