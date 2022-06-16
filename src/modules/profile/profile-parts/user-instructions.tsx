import React, { useContext, useState } from "react";
import TranslationContext from "../../../providers/translation-context";
import { UserPageGetTokenTasks } from "./user-get-token-tasks";
import cryptoImage from "../../../components/assets/images/crypto.jpg";
import metamask from "../../../components/assets/images/metamask-3.png";
import bunnyMono from "../../../components/assets/images/bunny-mono.png";
import nftImage from "../../../components/assets/images/nft.jpg";
import affiliateImage from "../../../components/assets/images/affiliate.jpg";
import insuranceImage from "../../../components/assets/images/insurance.jpg";
import metaverseImage from "../../../components/assets/images/metaverse.jpg";
import icoImage from "../../../components/assets/images/ico.jpg";
import logo from "../../../components/assets/images/WBT3.png";
import styles from "../style.module.css";

interface ModalHandler {
  alt: string;
  src: string;
}

interface UserPageInstructionsProps {
  readonly connectTo: boolean;
  readonly setConnect: (open: boolean) => void;
}

const UserPageInstructions = ({
  connectTo,
  setConnect,
}: UserPageInstructionsProps) => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState<{
    image: string | undefined;
    title: string | undefined;
  }>({
    image: "",
    title: "",
  });

  const { translations } = useContext(TranslationContext);

  function modalHandler({ alt, src }: ModalHandler) {
    setModal(true);
    setModalContent({
      title: alt,
      image: src,
    });
  }

  return (
    <section className={styles.crypto}>
      <div className="container">
        <div className={styles.crypto__content}>
          <img
            src={logo.src}
            alt="whitebride.club"
            className={styles.crypto__logo}
          />
          <h3>White Bridge Token </h3>
          <article>{translations?.crypo_wbt}</article>
        </div>

        <UserPageGetTokenTasks connectTo={connectTo} setConnect={setConnect} />
        <div className={styles.metamask__logo}>
          <img src={bunnyMono.src} alt="White Bridge Club Pancake Swap" />
          <img src={logo.src} alt="White Bridge Club" />
          <img src={metamask.src} alt="White Bridge Club Metamask" />
        </div>
        <div className={styles.crypto__content}>
          <img
            src={affiliateImage.src}
            onClick={(e) =>
              modalHandler({
                alt: e.currentTarget.alt,
                src: e.currentTarget.src,
              })
            }
            alt="White Bridge Club - Affiliate"
          />
          <h3>White Bridge Club - Affiliate</h3>
          <article>{translations?.affiliate_market}</article>
        </div>
        <div className={styles.crypto__content}>
          <img
            onClick={(e) =>
              modalHandler({
                alt: e.currentTarget.alt,
                src: e.currentTarget.src,
              })
            }
            src={nftImage.src}
            alt="White Bridge Club - NFT market place"
          />
          <h3>White Bridge Club - NFT market place</h3>
          <article>{translations?.nft_marketplace}</article>
        </div>
        <div className={styles.crypto__content}>
          <img
            onClick={(e) =>
              modalHandler({
                alt: e.currentTarget.alt,
                src: e.currentTarget.src,
              })
            }
            src={cryptoImage.src}
            alt="White Bridge Club - Cryptobank"
          />
          <h3>White Bridge Club - Cryptobank</h3>
          <article>{translations?.crypto_bank}</article>
        </div>
        <div className={styles.crypto__content}>
          <img
            src={insuranceImage.src}
            onClick={(e) =>
              modalHandler({
                alt: e.currentTarget.alt,
                src: e.currentTarget.src,
              })
            }
            alt="White Bridge Club - Insurance"
          />
          <h3>White Bridge Club - Insurance</h3>
          <article>{translations?.wb_insurance}</article>
        </div>
        <div className={styles.crypto__content}>
          <img
            src={icoImage.src}
            onClick={(e) =>
              modalHandler({
                alt: e.currentTarget.alt,
                src: e.currentTarget.src,
              })
            }
            alt="White Bridge Club - ICO"
          />
          <h3>White Bridge Club - ICO</h3>
          <article>{translations?.ico_wbt}</article>
        </div>

        <div className={styles.crypto__content}>
          <img
            src={metaverseImage.src}
            onClick={(e) =>
              modalHandler({
                alt: e.currentTarget.alt,
                src: e.currentTarget.src,
              })
            }
            alt="White Bridge Club - MetaVerse"
          />
          <h3>White Bridge Club - MetaVerse</h3>
          <article>{translations?.wb_metaverse}</article>
        </div>
      </div>
      {modal && (
        <div className={styles.crypto__modal} onClick={() => setModal(false)}>
          <img src={modalContent.image} alt={modalContent.title} />
        </div>
      )}
    </section>
  );
};

export { UserPageInstructions };
