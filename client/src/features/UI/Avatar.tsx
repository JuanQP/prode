import { Image, ImageProps, ImageStylesParams, Styles } from "@mantine/core";

const imageStyles: Styles<"root" | "caption" | "figure" | "image" | "placeholder" | "imageWrapper", ImageStylesParams> = (theme) => ({
  image: {
    boxShadow: '2px 2px black',
    border: '4px solid black',
  },
  placeholder: {
    boxShadow: '2px 2px black',
    border: '4px solid black',
  }
})

export function Avatar(props: ImageProps) {
  return (
    <Image
      styles={imageStyles}
      {...props}
    />
  )
}
