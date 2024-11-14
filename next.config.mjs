/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "nafyopizhmmgxzbjaejy.supabase.co",
      },
      {
        hostname:"static.wikia.nocookie.net",
      },
      {
        hostname:"projectsekai.fandom.com",
      },
      {
        hostname:"down-id.img.susercontent.com",
      }
    ],
  },
};

export default nextConfig;
