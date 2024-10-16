import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header/Header";
import { AnimatePresence } from 'framer-motion';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "CEHD Burton Display",
  description: "Interactive display for Burton Hall",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-[#7a0019] font-sans min-h-screen flex justify-center items-center">
        <div className="bg-white w-[1080px] mx-auto h-[1920px] overflow-hidden ">
          {children}
        </div>
      </body>
    </html>
  );
}