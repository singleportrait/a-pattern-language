import Link from "next/link";

interface PatternInlineReferenceBlockDto {
  _type: "patternReference";
  _ref: string;
  _key: string;
  name: string;
  number: number;
  slug: string;
}

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
