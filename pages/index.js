import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function homePage() {
  const items = [
    "Documentations",
    "LinkedIn",
    "Github",
    "Facebook",
    "Instagram",
  ];
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={utilStyles.containerHolder}>
        <div className={utilStyles.container}>
          <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
            <Image
              className="absolute flex justify-center rounded-xl object-cover"
              src="/media/images/school-bg.jpg"
              sizes="100vw"
              fill
              alt="HCMUS"
            />
            <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-black overflow-hidden">
              <Image
                className="h-full w-full object-cover"
                src="/media/images/profile_picture.jpg"
                sizes="100vw"
                fill
                alt="Jons Hung"
              />
            </div>
          </div>
          <div className="mt-14 flex flex-col items-center">
            <h4 className="text-xl font-bold text-blue-950">Jons Hung</h4>
          </div>
          <LinkButton
            label="Github"
            href="https://github.com/jonshung"
            buttonColor="green"
          />
          <LinkButton
            label="LinkedIn"
            href="https://www.linkedin.com/in/jonshung/"
            buttonColor="gray"
          />
          <LinkButton
            label="Facebook"
            href="https://facebook.com/jonshung.g"
            buttonColor="blue"
          />
        </div>
      </div>
      {/*<ul>
                {items.map((itemName) => {
                    if (itemName == "Documentations") {
                        <Link href="/documents/basic_usage"><li key={itemName}>itemName</li></Link>
                    } else {
                        <li key={itemName}>itemName</li>
                    }
                })}
            </ul>*/}
      <div></div>
    </Layout>
  );
}

function LinkButton({ label, href, buttonColor }) {
    const colorVariant = {
        blue: "bg-blue-300 text-blue-900 hover:bg-blue-400",
        green: "bg-green-300 text-green-900 hover:bg-green-400",
        gray: "bg-gray-300 text-gray-900 hover:bg-gray-400",
    }
  return (
    <div className="mt-4">
      <Link
        className={
            `inline-flex justify-center rounded-md border border-transparent px-32 py-2 text-sm font-mediu focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${colorVariant[buttonColor]}`
        }
        href={href}
      >
        {label}
      </Link>
    </div>
  );
}
