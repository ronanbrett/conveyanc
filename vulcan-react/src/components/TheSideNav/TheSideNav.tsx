import React from "react";
import { UserProfileCard } from "@components";
import styles from "./TheSideNav.module.scss";

interface TheSideNavProps {
  children?: any;
}

const TheSideNav = (props: TheSideNavProps) => {
  return (
    <nav className={styles.TheSideNav}>
      <UserProfileCard />
    </nav>
  );
};

export default TheSideNav;
