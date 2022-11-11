import { withErrorBoundary } from "@biblioteksentralen/js-utils";
import Head from "next/head";
import React, { useEffect } from "react";

interface Props {
  title?: string;
  description: string;
  path: string;
}

const domain = "https://nestebok.no";

function SEO(props: Props) {
  useEffect(() => {
    if (props.path && !/^\//.test(props.path)) {
      console.error(new Error("path må starte med /"));
    }
  }, [props.path]);

  const canonical = `${domain}${props.path}`;
  const title = props.title ? `${props.title} | Nestebok` : "Nestebok";
  const description = props.description;
  const imageUrl = `${domain}/logo.png`;

  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
      <meta name="description" content={description} />
      <meta property="image" content={imageUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={canonical} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Forrige bok" />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
}

export default withErrorBoundary(SEO, "SEO");
