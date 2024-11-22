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
      },{
        hostname:"mbvrysnfeutyqrfclwmh.supabase.co",
      }
    ],
  },
  async headers() {
    return[
      {
        source:"/api/:path*",
        headers:[
          {
            key:"Access-Control-Allow-Origin",
            value:process.env.NEXT_PUBLIC_API_URL|| "*",
          },
          {
            key:"Access-Control-Allow-Methods",
            value:"GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key:"Access-Control-Allow-Headers",
            value:"Content-Type, Authorization",
          },
        ]
      }
    ]
  }
};

export default nextConfig;
