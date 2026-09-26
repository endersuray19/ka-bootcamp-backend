/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    
    remotePatterns: [
      {
        hostname: "stqaqzchwgvtritwlczk.supabase.co",
      },
      {
        hostname: "static.wikia.nocookie.net",
      },
      {
        hostname: "projectsekai.fandom.com",
      },
      {
        hostname: "down-id.img.susercontent.com",
      },
      {
        protocol: 'https', // 🚨 WAJIB: Next.js perlu tahu protokol
        hostname: 'stqaqzchwgvtritwlczk.supabase.co',
        port: '',
        // 🚨 DIUBAH: hapus /images agar mencakup seluruh file di public storage
        pathname: '/storage/v1/object/public/**',
      },
      
      

      
    ],
    
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXT_PUBLIC_API_URL || "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ]
      }
    ]
  }
};

export default nextConfig;
