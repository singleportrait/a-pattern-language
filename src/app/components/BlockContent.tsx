import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import { portableTextComponents } from "@/app/helpers/portableTextComponents";

const BlockContent = ({ content }: { content: PortableTextBlock }) => {
  return <PortableText value={content} components={portableTextComponents} />;
};

export default BlockContent;
