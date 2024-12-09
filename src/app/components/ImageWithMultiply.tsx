import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

import { ImageReferenceDto } from "@/sanity/lib/definitions";

type ImageWithMultiplyProps = {
  image: ImageReferenceDto;
  alt: string;
  maxWidth?: number;
};

const ImageWithMultiply = ({
  image,
  alt,
  maxWidth = 500,
}: ImageWithMultiplyProps) => {
  return (
    <Image
      src={
        urlFor(image)
          .width(maxWidth * 2)
          .url() || ""
      }
      alt={alt}
      width={maxWidth}
      height={image.ratio ? maxWidth / image.ratio : maxWidth}
      className="mix-blend-multiply bg-accent-highlight"
    />
  );
};

export default ImageWithMultiply;
