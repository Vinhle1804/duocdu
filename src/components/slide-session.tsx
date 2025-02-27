"use client";

import { useEffect } from "react";
import { differenceInHours } from "date-fns";
import authApiRequest from "@/apiRequest/auth";
import { clientSessionToken } from "@/lib/http";

export function SlideSession() {
  useEffect(() => {



    const interval = setInterval(async () => {
      const now = new Date();
      const expiresAt = new Date(clientSessionToken.expiresAt);
      console.log("⏳ Kiểm tra session:", { now, expiresAt });

      if (differenceInHours(expiresAt, now) < 1) {
        console.log("🔄 Session sắp hết hạn, gọi API refresh...");
        try {
          const res = await authApiRequest.slideSessionFromNextClientToNextServer();
          clientSessionToken.expiresAt = res?.payload?.data?.expiresAt;
          console.log("✅ Session mới:", clientSessionToken.expiresAt);
        } catch (error) {
          console.error("Lỗi khi gọi slideSession:", error);
        }
      }
    }, 60*1000); // Chạy mỗi 1 giờ

    return () => clearInterval(interval);
  }, []);

  return null;
}
