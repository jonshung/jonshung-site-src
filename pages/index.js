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
          <div className="grid gap-10 mt-4">
            <LinkButton
              label="Github"
              href="https://github.com/jonshung"
              buttonId="github"
            />
            <LinkButton
              label="LinkedIn"
              href="https://www.linkedin.com/in/jonshung/"
              buttonId="linkedin"
            />
            <LinkButton
              label="Facebook"
              href="https://facebook.com/jonshung.g"
              buttonId="facebook"
            />
          </div>
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

function LinkButton({ label, href, buttonId }) {
  const colorVariant = {
    facebook: "hover:bg-[#5890ff] hover:text-blue-900 hover:shadow-blue-400",
    github: "hover:bg-[#39d98a] hover:text-green-950 hover:shadow-green-400",
    linkedin: "hover:bg-[#0077B5] hover:text-gray-900 hover:shadow-[#0077B5]",
  };
  const iconVariant = {
    facebook: "facebook-icon.webp",
    github: "github-icon.png",
    linkedin: "linkedin-icon.png",
  };
  return (
    <Link
      className={
        `w-52 h-16 relative flex group overflow-clip
            transition rounded-2xl backdrop-blur-xl bg-white shadow-lg shadow-white/[.9] items-center justify-center 
            border-[0.2px] border-transparent text-lg font-bold focus:outline-none focus-visible:ring-2 
          focus-visible:ring-blue-500 focus-visible:ring-offset-2 max-w-[200px] hover:scale-110 ` +
        colorVariant[buttonId]
      }
      href={href}
    >
      <Image
        src={"/media/images/" + iconVariant[buttonId]}
        className={"transition duration-300 -translate-x-44 absolute group-hover:translate-x-0 object-contain"}
        sizes="100vw"
        width={35}
        height={35}
        alt="link icon"
      />
      <div
        className={
          "transition duration-300 text-black group-hover:translate-x-44"
        }
      >
        {label}
      </div>
    </Link>
  );
}
