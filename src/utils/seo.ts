interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
  creator?: string;
}

export const generateSeoTags = (props: SeoProps) => {
  const { title, description, keywords, image, creator } = props;

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: creator },
    { name: "twitter:site", content: creator },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    ...(image
      ? [
          { name: "twitter:image", content: image },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "og:image", content: image },
        ]
      : []),
  ];
};
