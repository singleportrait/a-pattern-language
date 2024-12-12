import ImageWithMultiply from "@/app/components/ImageWithMultiply";
import { ImageReferenceDto } from "@/sanity/lib/definitions";
import Link from "next/link";

type PatternInlineReferenceBlockDto = {
  _type: "patternReference";
  _ref: string;
  _key: string;
  name: string;
  number: number;
  slug: string;
};

type BlockContentImageDto = {
  _key: string;
  alt: string;
  caption?: string;
  captionUrl?: string;
  image: ImageReferenceDto;
};

type BlockContentImagesDto = {
  _type: "blockContentImages";
  _key: string;
  images: BlockContentImageDto[];
};

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
    blockContentImages: ({ value }: { value: BlockContentImagesDto }) => {
      return (
        <span className="flex gap-x-5 justify-center">
          {value.images.map((image) => (
            <span
              key={image._key}
              className="flex flex-col items-center gap-y-2"
            >
              <span className="p-4 bg-accent">
                <ImageWithMultiply
                  image={image.image}
                  alt={image.alt}
                  className="max-h-52 sm:max-h-88 w-auto"
                />
              </span>
              {image.caption && image.captionUrl && (
                <a
                  href={image.captionUrl}
                  className="text-sm underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {image.caption}
                </a>
              )}
              {image.caption && !image.captionUrl && (
                <span className="text-sm">{image.caption}</span>
              )}
            </span>
          ))}
        </span>
      );
    },
  },
};
