import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images:{
  remotePatterns: [
    {
      protocol:'http',
      hostname:'localhost',
      port:'4000',
      // pathname: "/static/**", 
    }
  ]
 },
 logging:{
  fetches:{
    fullUrl:true
  }
 }
};

export default nextConfig;
