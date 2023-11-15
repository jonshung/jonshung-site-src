import Link from "next/link";

import { Inter } from "next/font/google";
import "./global.css";
import utilStyles from "../styles/utils.module.css";

import { SideBar } from "./component/sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter-font",
});
export const siteTitle = "Jons Hung";

export const metadata = {
  title: "Jons Hung",
  description: "Jons Hung Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden flex min-w-screen min-h-screen">
        <SideBar className="row-span-full" />
        <div className={utilStyles.containerHolder}>{children}</div>
      </body>
    </html>
  );
}

export function LinkButton() {
  const colorVariant = {
    back: "hover:bg-[#000000] hover:shadow-black",
  };
  return (
    <Link
      className={
        `w-52 h-16 flex group overflow-clip
            transition duration-300 rounded-2xl backdrop-blur-xl bg-white shadow-lg shadow-white/[.9] items-center justify-center 
            border-[0.2px] border-transparent text-lg font-thin focus:outline-none focus-visible:ring-2 
          focus-visible:ring-blue-500 focus-visible:ring-offset-2 max-w-[200px] hover:scale-110 ` +
        colorVariant.back
      }
      href="/"
    >
      <div
        className={
          "transition duration-300 text-black group-hover:text-white group-hover:text-md group-hover:font-semibold"
        }
      >
        Home
      </div>
    </Link>
  );
}