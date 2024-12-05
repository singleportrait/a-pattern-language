import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import cx from "classnames";
import { portableTextComponents } from "@/app/helpers/portableTextComponents";

const BlockContent = ({
  content,
  classNames = "",
}: {
  content: PortableTextBlock[];
  classNames?: string;
}) => {
  return (
    <div
      className={cx({
        rich_text_formatting: true,
        [classNames]: !!classNames,
      })}
    >
      <PortableText value={content} components={portableTextComponents} />
    </div>
  );
};

export default BlockContent;
