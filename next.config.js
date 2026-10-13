module.exports = {
    swcMinify: true,
    async redirects() {
        return [
          {
            source: '/blog',
            destination: '/',
            permanent: true,
          },
        ]
      },
};

// Next.js config file
// module.exports exposes config settings to Next.js
// swcMinify enables the SWC compiler for faster builds
// async redirects defines URL redirects for my website
//  its a perminent redirect!

// to sum up, it tells Next.js to minify output and redirects /blog to /