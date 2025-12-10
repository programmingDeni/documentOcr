import { useNavigate, useLocation } from "react-router-dom";
import reactLogo from "../../assets/react.svg";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        {/* Left: Back & Home */}
        <div className={styles.leftSection}></div>

        {/* Center: Logo */}
        <div className={styles.logoContainer}>
          <img src={reactLogo} alt="Logo" className={styles.logo} />
        </div>

        {/* Right: Logout */}
        <div className={styles.rightSection}></div>
      </div>
    </nav>
  );
}
