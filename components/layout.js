import Head from "next/head";
import Link from "next/link";
import bgImg from "./background.module.css";
import dynamic from "next/dynamic";

import { useState, useEffect } from "react";

export const siteTitle = "Jons Hung";

function NoGraph({}) {
  return <h1>Loading...</h1>;
}

export default function Layout({ children, home }) {
  const [ didMount, setDidMount ] = useState(false);
  useEffect(() => {
    setDidMount(true);
  }, []);
  let GraphComponent;
  if(didMount) {
    GraphComponent = dynamic(() => import("./graph"), { ssr: false });
  }
  return (
    <div>
      <Head>
        <meta name="description" content="Jons Hung personal website" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <main className={bgImg.bgImg}>
        {didMount ? (<GraphComponent />) : (<NoGraph />)}
        {children}
      </main>
    </div>
  );
}
