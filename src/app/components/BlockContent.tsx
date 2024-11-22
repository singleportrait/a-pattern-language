import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import { portableTextComponents } from "@/app/helpers/portableTextComponents";

const BlockContent = ({
  content,
  classNames = "",
}: {
  content: PortableTextBlock;
  classNames?: string;
}) => {
  return (
    <div className={classNames}>
      <PortableText value={content} components={portableTextComponents} />
    </div>
  );
};

export default BlockContent;
