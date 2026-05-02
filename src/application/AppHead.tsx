import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
  meta?: Partial<{
    baseTitle?: string;
    title: string;
    description: string;
    ogImage: string;
  }>;
}

const AppHead = ({ meta = {} }: Props) => {
  const router = useRouter();
  const pathname = router.asPath.split("?")[0];
  const title = [meta.title, meta.baseTitle].filter(Boolean).join(" — ");

  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      {process.env.NEXT_PUBLIC_HOST && (
        <meta
          property="og:url"
          content={`${(process.env.NEXT_PUBLIC_HOST || "").replace(/\/$/, "")}${pathname}`}
        />
      )}
      <meta property="og:locale" content="ru" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {meta.description && (
        <meta property="og:description" content={meta.description} />
      )}
      {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}
      <meta name="twitter:card" content="summary" />
      {meta.ogImage && <meta name="twitter:image" content={meta.ogImage} />}
      <meta name="twitter:title" content={title} />
      {meta.description && (
        <meta name="twitter:description" content={meta.description} />
      )}
      <link rel="icon" href="/static/favicon/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicon/favicon.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/favicon/apple-touch-icon.png"
      />
    </Head>
  );
};

export default AppHead;
