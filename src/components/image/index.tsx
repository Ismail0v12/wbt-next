import NextImage, { ImageProps as NextImageProps } from "next/image";

type ImageProps = NextImageProps & {
  readonly src: string | undefined;
  readonly alt: string | undefined;
};

export function Image({ src, alt, ...props }: ImageProps) {
  function imageUrlValidator(image: string | undefined) {
    if (
      (image && image.indexOf("https://") !== -1) ||
      (image && image.indexOf("http://") !== -1)
    ) {
      return image;
    } else {
      return "https://whitebridge.site" + image;
    }
  }

  const imageSrc = imageUrlValidator(src);

  return (
    <NextImage
      src={imageSrc}
      loading="lazy"
      blurDataURL={imageSrc}
      placeholder="blur"
      alt={alt}
      {...props}
    />
  );
}
