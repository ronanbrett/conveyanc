import { useAuth } from "@core/auth";
import React from "react";
import styles from "./UserProfileCard.module.scss";

interface UserProfileCardProps {
  children?: any;
}

const UserProfileCard = (props: UserProfileCardProps) => {
  const { logout, login, isAuthenticated, user } = useAuth();
  return (
    <div className={styles.UserProfileCard}>
      <section className="media">
        <img src="" alt="" />
        {isAuthenticated ? (
          <div className="media__content">
            <h1>Hello,</h1>
            <p>Ronan</p>
            <button onClick={logout}>Log Out</button>
          </div>
        ) : (
          <div className="media__content">
            <button onClick={login}>Log in</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default UserProfileCard;
