import classNames from "classnames";
import { ImageProps, getImageProps } from "next/image";
import { OrientationImageShape } from "@/shared/model/types";

export type Props = React.HTMLAttributes<HTMLPictureElement> & {
  sources: OrientationImageShape;
  alt?: ImageProps["alt"];
  sizes?: ImageProps["sizes"];
  loading?: "lazy" | "eager";
  ref?: React.Ref<HTMLPictureElement>;
};

const OrientationImage = ({
  sources,
  sizes = "100vw",
  alt = "",
  loading,
  ref,
  ...props
}: Props) => {
  const _alt = sources.horizontal?.alt || sources.vertical?.alt || alt;
  const title = sources.horizontal?.title || sources.vertical?.title;

  const horiz = getImageProps({
    width: sources.horizontal?.width || 1,
    height: sources.horizontal?.height || 1,
    sizes,
    src: sources.horizontal?.src || "",
    alt: _alt,
  });

  const vert = sources.vertical
    ? getImageProps({
        width: sources.vertical.width || 1,
        height: sources.vertical.height || 1,
        sizes,
        src: sources.vertical.src,
        alt: _alt,
      })
    : null;

  return (
    <picture
      {...props}
      ref={ref}
      className={classNames("orientation-image", props.className)}>
      {vert && (
        <source
          media="(orientation: portrait)"
          srcSet={vert.props.srcSet}
          sizes={sizes}
        />
      )}
      <img
        className="orientation-image__img"
        {...horiz.props}
        alt={_alt}
        title={title}
        loading={loading}
      />
    </picture>
  );
};

export default OrientationImage;
