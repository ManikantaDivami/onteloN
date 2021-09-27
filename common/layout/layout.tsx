import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import styles from "../../styles/App.module.scss";

const Layout = ({ children }: any) => {
  return (
    <div className="content">
      <Header />
      {children}
      <div className={styles.wrapper} data-testid="footer-section">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
