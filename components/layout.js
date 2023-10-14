import styles from "./layout.module.css";
import Head from "next/head";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import Image from "next/image";

const name = "Jons Hung";
export const siteTitle = "Jons Hung";

const getProfilePicture = () => (
  <div className={utilStyles.borderCircle}>
    <Image
      src="/media/images/profile_picture.jpg"
      sizes="200vw"
      fill
      style={{ objectFit: "cover" }}
      alt="Jons Hung"
    />
  </div>
);

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <meta name="description" content="Jons Hung personal website" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
