import Link from "next/link";
import { PatternInlineReferenceBlock } from "./types";

export const portableTextComponents = {
  types: {
    patternReference: ({ value }: { value: PatternInlineReferenceBlock }) => {
      return (
        <Link href={`/patterns/${value.slug}`} className="underline">
          {value.number}. {value.name}
        </Link>
      );
    },
  },
};
