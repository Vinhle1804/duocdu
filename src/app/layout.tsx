import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import AppProvider from "./context/AppProvider";
import { cookies } from "next/headers";
import { SlideSession } from "@/components/slide-session";
import Header from "@/components/header";

const inter = Inter({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies(); // Thêm 'await' để lấy dữ liệu cookies
  const sessionToken = cookieStore.get('sessionToken')

  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` ${inter.variable} antialiased`}>
        <Toaster/>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider
           initialSessionToken = {sessionToken?.value}
          ><Header/>
            {children}
          <SlideSession/>
          </AppProvider>
          
        </ThemeProvider>
      </body>
    </html>
  );
}
