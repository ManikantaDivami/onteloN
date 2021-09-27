import React from "react";
// import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useHistory } from "react-router-dom";
import login from "../../public/images/svgs/login.svg";
import logo from "../../public/images/svgs/logo.svg";
import styles from "./header.module.scss";
import Image from "next/image";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

// export const getStaticProps = async ({ locale }: any) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ["common"])),
//   },
// });

const Header: React.FC<{
  readonly isSignUp?: boolean;
}> = ({ isSignUp = false }) => {
  const router = useRouter();
  // const { t } = useTranslation();
  const commonHeaderLinks = [
    {
      text: "Knowledge",
      to: "/knowledge",
    },
    {
      text: "Experts",
      to: "/expert",
    },
    {
      text: "Teams",
      to: "/teams",
    },
  ];
  return (
    <div className={styles.header}>
      <div className={styles.home_link}>
        <Link href="/home" passHref>
          <div className={styles.logo}>
            <Image src={logo} alt="logo" data-testid="logo" />
          </div>
        </Link>
      </div>
      {!isSignUp ? (
        <>
          <div className={styles["header-nav"]}>
            {commonHeaderLinks.map((each, index) => (
              <React.Fragment key={index}>
                <Link href={each.to} passHref>
                  <div
                    className={
                      router.pathname === each.to
                        ? styles.active_tab
                        : styles["header-tab"]
                    }
                  >
                    {each.text}
                  </div>
                </Link>
              </React.Fragment>
            ))}
          </div>
          <div className={styles["header-btns"]}>
            <div>
              <button className={styles.login} data-testid="login">
                <Image src={login} className={styles.log} alt="login icon" />
                <div className={styles["button-text"]}>Login</div>
              </button>
            </div>
            <div>
              <button
                className={styles["common-btn"]}
                data-testid="signup"
                onClick={() => {
                  router.push("/sign-up");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
