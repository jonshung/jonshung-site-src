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
          <div className="relative flex h-40 w-full justify-center rounded-xl bg-cover">
            <Image
              className="absolute flex justify-center rounded-xl object-cover"
              src="/media/images/school-bg.jpg"
              sizes="100vw"
              fill
              alt="HCMUS"
            />
            <div className="absolute -bottom-12 flex h-[100px] w-[100px] items-center justify-center rounded-full border-[10px] border-white/0 backdrop-blur-md bg-white/0 overflow-hidden">
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
            <h4 className="text-xl font-bold text-white">Jons Hung</h4>
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
    </Layout>
  );
}

function LinkButton({ label, href, buttonColor }) {
  const colorVariant = {
    blue: "text-blue-600 hover:bg-blue-400 hover:text-blue-900",
    green: "text-green-700 hover:bg-green-400 hover:text-green-950",
    gray: "text-gray-600 hover:bg-gray-400 hover:text-gray-900",
  };
  return (
    <div className="mt-6">
      <Link
        className={`max-w-[200px] transition backdrop-blur-lg bg-transparent inline-flex justify-center border-[0.2px] border-transparent px-20 py-6 text-lg font-bold focus:outline-none focus-visible:ring-2 
            focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${colorVariant[buttonColor]}`}
        href={href}
      >
        {label}
      </Link>
    </div>
  );
}
