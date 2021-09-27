import React from "react";
// import { useTranslation } from "next-i18next";
import Link from "next/link";
import facebook from "../../public/images/svgs/facebook.svg";
import instagram from "../../public/images/svgs/instagram.svg";
import Image from "next/image";
import linkedin from "../../public/images/svgs/linkedin.svg";
import logo from "../../public/images/svgs/ontelo-logo.svg";
import twitter from "../../public/images/svgs/twitter.svg";
import styles from "./footer.module.scss";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// export const getStaticProps = async ({ locale }: any) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ["common"])),
//   },
// });

const Footer: React.FC = () => {
  // const { t } = useTranslation();
  const socialMedia = [
    {
      logo: instagram,
      text: "instagram-logo",
      to: "/",
    },
    {
      logo: linkedin,
      text: "linkedin-logo",
      to: "https://www.linkedin.com/company/ontelo/about/?viewAsMember=true",
    },
    {
      logo: facebook,
      text: "facebook-logo",
      to: "https://www.facebook.com/Ontelo-108555041488622",
    },
    {
      logo: twitter,
      text: "twitter-logo",
      to: "https://twitter.com/ontelo_learning",
    },
  ];
  return (
    <div className={styles.footer}>
      <div className={styles.footer__logo}>
        <Image
          src={logo}
          className={styles["ontelo-logo"]}
          alt="ontelo-logo"
          data-testid="logo_footer"
        />
      </div>
      <div className={styles.footer__email}>info@ontelo.io</div>
      <div className={styles.footer__section}>
        <div className={styles["footer__contact-info"]}>
          <div>UK: +44 (0)20 7947 9197</div>
          <div>UAE: +971 4871 6715</div>
          <div>South Africa: +27 (0)10 005 5793</div>
        </div>
        {/* <div className={styles['links-div']}>
            <Link to="/privacy-policy" target="_blank" rel="noreferrer">
            <span className={styles.links}> Privacy policy</span>
            </Link>{' '}
            </div>
            <div className={styles['links-div']}>
            <Link to="/terms-and-conditions" target="_blank" rel="noreferrer">
            <span className={styles.links}>Terms & Conditions</span>
            </Link>
          </div> */}

        <div className={styles["links-div"]}>
          <Link href="/help-center?tab=learners">
            <a target="_blank" rel="noreferrer" className={styles.links}>
              Help center
            </a>
          </Link>
        </div>
      </div>

      <div className={styles["footer__social-media"]}>
        <div className={styles.footer__rights}>
          ontelo® | The Knowledge Market © 2021 All Rights Reserved.
        </div>
        <div className={styles["footer__social-media-icon"]}>
          {socialMedia.map((each, index) => (
            <React.Fragment key={index}>
              <a href={each.to} target="_blank" rel="noreferrer">
                <Image src={each.logo} alt={each.text} />
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
