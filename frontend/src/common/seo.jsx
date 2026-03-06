import Head from "next/head";

const SEO = ({ pageTitle }) => {
  const defaultDescription = "Easily check your balances, view your transactions or statements ...";
  const siteName = "Royal Bank";
  const fullTitle = pageTitle ? `${pageTitle} - ${siteName}` : siteName;
  const logoUrl = "/assets/img/logo/logo-white.png";

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="description" content={defaultDescription} />
        <meta name="robots" content="index, follow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        
        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:image" content={logoUrl} />
        <meta property="og:site_name" content={siteName} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={defaultDescription} />
        <meta name="twitter:image" content={logoUrl} />

        <link rel="icon" href={logoUrl} />
      </Head>
    </>
  );
};

export default SEO;
