import React, { useContext, useEffect, useState } from "react";
import { UserPageNavbar } from "./profile-parts/user-navbar";
import { UserPageInfo } from "./profile-parts/user-info";
import { UserPageInstructions } from "./profile-parts/user-instructions";
import { ParticlesAnime } from "../../components/particles-anime";
import { UserConnectWallet } from "./profile-parts/user-connect-wallet";
import { UserInfoContextProvider } from "../../providers";
import styles from "./style.module.css";

const UserPage = () => {
  const [connect, setConnect] = useState(false);

  return (
    <UserInfoContextProvider>
      <section className={styles.user}>
        <UserPageNavbar />
        <ParticlesAnime />
        <div className="container py-5">
          <UserPageInfo setConnect={setConnect} />
          <UserPageInstructions connectTo={connect} setConnect={setConnect} />
        </div>
        <UserConnectWallet connectTo={connect} setConnect={setConnect} />
      </section>
    </UserInfoContextProvider>
  );
};

export default UserPage;
