import Footer from "../global/Footer";
import Head from "next/head";
import MobileNavbar from "../global/MobileNavbar";
import Navbar from "../global/Navbar";
import React, { ReactChildren } from "react";

// This component is a reusable page wrapper that sets the page title, description, and other meta tags. 
// It also includes the Navbar and Footer components, as well as a mobile-friendly version of the Navbar.

// The component expects:
// - currentPage: a string representing the current page name, used to set the page title.
// - meta: an object containing optional title and required description for the page.
// - children: the content of the page, which can be a single JSX element or an array of JSX elements.
function Page({ currentPage, meta: { title, desc }, children }: PageProps) {
  // Builds broswer tab title, if the page is home, itll show the full title,
  // otherwise itll show the current page name followed by the site name.
  const pageTitle = `${
    currentPage === "Home"
      ? "Chloe Russell - Coder + Designer"
      : `${currentPage} - ChloeRussell.dev`
  }`;
  console.log(currentPage);
  return (
    <div
      className="w-full m-auto flex flex-col items-center justify-center min-h-screen opening-box-animate-paddin text-white overflow-hidden md:overflow-visible"
      style={{ maxWidth: "1200px" }}
    >
      <Head>
        // this injects tags into the document
        // title tag is used to set the title of the page, shows up in search results
        <title>{pageTitle}</title>
        // links to the favicon images for different devices and sizes
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/favicon/apple-touch-icon.png"
        />
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
          href="/static/favicon/favicon-16x16.png"
        />
        <link 
          rel="manifest" 
          href="/static/favicon/site.webmanifest" 
        />
        // meta tags for SEO and socials,
        // desc comes from the meta prop passed to the component, title is built from the currentPage prop
        <meta name="title" content={pageTitle} />
        <meta name="description" content={desc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chloerussell.dev/" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content="https://chloerussell.dev/static/misc/og.png" />
        // sociaL medias
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://chloerussell.dev/" />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={desc} />
        <meta property="twitter:image" content="https://chloerussell.dev/static/misc/og.png" ></meta>
        // google analytics and tag manager scripts, these are used to track page views and other analytics data
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
        // this script is used to load the Google Tag Manager script, which is used to manage and 
        // deploy marketing tags (snippets of code or tracking pixels) on the website without having to
        // modify the codebase directly.
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KC3CN7V');`,
          }}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
          `,
          }}
        />
      // this ensures Google Tag Manager still works if the user has JavaScript disabled in their 
      //browser. It creates an invisible iframe that loads the GTM script, allowing it to function 
      // even without JavaScript.  
      </Head>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KC3CN7V"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      ></noscript>

      <main className="p-5 w-full flex-1 text-center">
        <div className="hidden sm:block z-100">
          <Navbar currentPage={currentPage} />
        </div>
        <div className="-m-5 block sm:hidden z-100">
          <MobileNavbar />
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}
// the above component is the main content area
// it includes the Navbar, MobileNavbar, and Footer components, as well as the children prop 
// which represents the main content of the page.
export default Page;

type PageProps = {
  currentPage: string;
  meta: {
    title?: string;
    desc: string;
  };
  children?: JSX.Element | JSX.Element[];
};
