import { useNavigate } from "react-router-dom";
import reactLogo from "../../../assets/react.svg";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const navigate = useNavigate();

  const hideButtons = location.pathname === "/";

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        {/* Left: Back & Home */}
        <div className={styles.leftSection}>
          {!hideButtons && (
            <button onClick={() => navigate(-1)}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          )}
        </div>

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
