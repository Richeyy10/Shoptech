import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      remotePatterns: [
        {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: '**',
        },
        {
            protocol: 'https',
            hostname: 'github.com',
            pathname: '**',
        },
    ],
    },
};

export default nextConfig;


// module.exports = {
//   images: {
//     remotePatterns: [new URL('https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/k4dafzhwhgcn5tnoylrw.webp')],
//   },
// };
