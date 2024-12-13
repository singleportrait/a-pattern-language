import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

import { ImageReferenceDto } from "@/sanity/lib/definitions";
import classNames from "classnames";

type ImageWithMultiplyProps = {
  image: ImageReferenceDto;
  alt: string;
  maxWidth?: number;
  className?: string;
};

const ImageWithMultiply = ({
  image,
  alt,
  maxWidth = 500,
  className,
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
      height={image.ratio ? Math.round(maxWidth / image.ratio) : maxWidth}
      className={classNames("mix-blend-multiply bg-accent-100", className)}
    />
  );
};

export default ImageWithMultiply;
