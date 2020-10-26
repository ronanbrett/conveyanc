import { useAuth } from "@core/auth";
import React from "react";
import styles from "./UserProfileCard.module.scss";
import profileImg from "./profile.png";
import { di } from "react-magnetic-di/macro";

interface UserProfileCardProps {
  children?: any;
}

const UserProfileCard = (props: UserProfileCardProps) => {
  di(useAuth);
  const { logout, login, register, isAuthenticated, user } = useAuth();
  return (
    <div className={styles.UserProfileCard}>
      <section className="media">
        <img src={profileImg} alt="" />
        {isAuthenticated ? (
          <div className="media__content">
            <h1>Hello,</h1>
            <p>{user ? user.username : ""}</p>
            <button onClick={logout}>Log Out</button>
          </div>
        ) : (
          <div className="media__content">
            <button onClick={login}>Log in</button>
            <button onClick={register}>Reg</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default UserProfileCard;
