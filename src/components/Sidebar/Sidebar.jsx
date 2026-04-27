import React from "react";
import styles from "../../styles/Sidebar.module.scss"; 
import {
  LayoutGrid,
  ShoppingBag,
  MapPin,
  User,
  LogOut,
  ChevronLeft,
} from "lucide-react";

const Sidebar = ({ isCollapsed, onClose, onOpen }) => {
  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <div className={styles["sidebar-header"]}>
        <div className={styles["logo-container"]} onClick={onOpen}>
          <div className={styles["logo-icon"]}>
            <LayoutGrid size={24} strokeWidth={2.5} />
          </div>
          <span className={`${styles["logo-text"]} ${isCollapsed ? styles.hidden : styles.visible}`}>
            mixsoon
          </span>
        </div>

        <button
          className={`${styles["collapse-btn"]} ${isCollapsed ? styles["hide-btn"] : styles["show-btn"]}`}
          onClick={onClose}
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      <nav className={styles["nav-menu"]}>
        <NavItem
          icon={<LayoutGrid size={22} />}
          label="Dashboard"
          active
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<ShoppingBag size={22} />}
          label="Pedidos"
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<MapPin size={22} />}
          label="Ubicaciones"
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<User size={22} />}
          label="Cuenta"
          isCollapsed={isCollapsed}
        />

        <div className={styles["nav-spacer"]}></div>

        <NavItem
          icon={<LogOut size={22} />}
          label="Salir"
          color="#f87171"
          isCollapsed={isCollapsed}
          className={styles["logout-item"]}
        />
      </nav>
    </aside>
  );
};

const NavItem = ({
  icon,
  label,
  active,
  color,
  isCollapsed,
  className = "",
}) => (
  <a
    className={`${styles["nav-item"]} ${active ? styles.active : ""} ${className}`}
    style={{ color: color }}
  >
    <div className={styles["nav-icon"]}>{icon}</div>
    {!isCollapsed && <span className={styles["nav-label"]}>{label}</span>}
  </a>
);

export default Sidebar;