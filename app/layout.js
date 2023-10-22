import Link from "next/link";
import bgImg from "../components/background.module.css";
import utilStyles from "../styles/utils.module.css";
import dynamic from "next/dynamic";

import { Inter } from "next/font/google";
import "../styles/global.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter-font",
});
export const siteTitle = "Jons Hung";

export const metadata = {
  title: "Home",
  description: "Jons Hung Portfolio",
};

export default function RootLayout({ children }) {
  const DynamicGraph = dynamic(() => import('../components/graph'), { ssr: false });

  return (
    <html lang="en">
      <body>
        <div className={utilStyles.containerHolder + "  " + bgImg.bgImg}>
          <div className={utilStyles.container}>{children}</div>
          <DynamicGraph
            className="z-0"
            minNodeConnect={1}
            maxNodeConnect={3}
          ></DynamicGraph>
        </div>
      </body>
    </html>
  );
}

function LinkButton() {
  const colorVariant = {
    back: "hover:bg-[#5890ff] hover:text-blue-900 hover:shadow-blue-400",
  };
  return (
    <Link
      className={
        `w-52 h-16 flex group overflow-clip
            transition rounded-2xl backdrop-blur-xl bg-white shadow-lg shadow-white/[.9] items-center justify-center 
            border-[0.2px] border-transparent text-lg font-thin focus:outline-none focus-visible:ring-2 
          focus-visible:ring-blue-500 focus-visible:ring-offset-2 max-w-[200px] hover:scale-110 ` +
        colorVariant.back
      }
      href="/"
    >
      <div
        className={
          "transition duration-300 text-black group-hover:text-md group-hover:font-semibold"
        }
      >
        Home
      </div>
    </Link>
  );
}

export function BackdropBlurContainer({ children, home, padding }) {
  padding = padding == undefined ? "p-0" : padding;
  return (
    <div
      className={`relative w-full h-full pointer-events-auto ${padding} pb-16  flex flex-col items-center justify-start bg-white/[.1] shadow-white/[.1] 
                    shadow-xl bg-clip-border border-[5px] border-transparent rounded-xl backdrop-blur-[4px] drop-shadow-lg`}
    >
      {children}
      {!home ? (
        <div className="mt-10 relative">
          <LinkButton />
        </div>
      ) : null}
    </div>
  );
}

export function SolidWhiteContainer({ children, home, padding }) {
  padding = padding == undefined ? "p-0" : padding;
  return (
    <div
      className={`relative flex flex-col pointer-events-auto ${padding} w-full h-full max-h-[450px] max-w-[350px] pb-16 items-center justify-start bg-white shadow-white/[.1] 
                   shadow-xl drop-shadow-lg`}
    >
      {children}
      {!home ? (
        <div className="mt-16 relative px-4">
          <LinkButton />
        </div>
      ) : null}
    </div>
  );
}
