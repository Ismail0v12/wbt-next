import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useMetaMask } from "metamask-react";
import { Modal } from "../../../components/modal";
import metamask from "../../../components/assets/images/metamask.png";
import { putData } from "../../../api/BaseApi";
import TranslationContext from "../../../providers/translation-context";
import QuestionMarkIcon from "../../../components/assets/icons/QuestionMarkIcon";
import UserInfoContext from "../../../providers/user-info-context";

interface UserConnectWalletProps {
  readonly connectTo: boolean;
  readonly setConnect: (open: boolean) => void;
}

function UserConnectWallet({ connectTo, setConnect }: UserConnectWalletProps) {
  const { userData } = useContext(UserInfoContext);
  const [copied, setCopied] = useState(false);
  const { status, connect } = useMetaMask();
  const { translations } = useContext(TranslationContext);
  const [walletStatus, setWalletStatus] = useState<any>(false);

  return (
    <>
      {connectTo &&
        ReactDOM.createPortal(
          <Modal setModal={setConnect} title={translations?.connect_wallet}>
            <>
              <>
                <div className="share">
                  <button
                    onClick={() => {
                      if (status === "unavailable") {
                        return;
                      } else {
                        if (status === "connected") {
                          return;
                        } else {
                          connect()
                            .then(async (res) => {
                              if (res) {
                                await putData(`/profile/${userData?.id}/`, {
                                  metamask_id: res[0],
                                }).then((res: any) => {
                                  if (res) {
                                    setConnect(false);
                                    document.location.reload();
                                  }
                                });
                              }
                            })
                            .catch((err) => console.log(err));
                        }
                      }
                    }}
                    className="share__button"
                  >
                    {status === "unavailable" && (
                      <h5>
                        {walletStatus ? (
                          <span onClick={() => window.location.reload()}>
                            {translations?.please_click_me}
                          </span>
                        ) : (
                          <a
                            href="https://metamask.io/"
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => setWalletStatus(true)}
                          >
                            {translations?.please_install_metamask}
                          </a>
                        )}
                      </h5>
                    )}
                    {status === "notConnected" && (
                      <h5>{translations?.connect_to_metamask}</h5>
                    )}
                    {status === "connected" && (
                      <h5>{translations?.metamask_connected}</h5>
                    )}
                    {status === "initializing" && (
                      <h5>{translations?.initializing_metamask}</h5>
                    )}
                    {status === "connecting" && (
                      <h5>{translations?.connecting_to_metamask}</h5>
                    )}
                    <img src={metamask.src} alt="whitebridge.club" />
                  </button>
                  {status === "connected" && (
                    <button
                      className="share__button"
                      onClick={() => {
                        navigator.clipboard.writeText(userData?.metamask_id);
                        setCopied(true);
                      }}
                    >
                      {status === "connected" && (
                        <h5>
                          {copied
                            ? translations?.copied
                            : translations?.click_to_copy}
                          : {userData?.metamask_id}
                        </h5>
                      )}
                    </button>
                  )}
                </div>
                <a
                  href="https://whitebridge.site/static/images/default_img.png"
                  className="howto"
                  download
                  style={{ marginTop: 10, display: "block" }}
                >
                  <QuestionMarkIcon />
                  {translations?.learn_how_to_connect}
                </a>
              </>
            </>
          </Modal>,
          document.getElementById("__next") as HTMLDivElement
        )}
    </>
  );
}

export { UserConnectWallet };

// : (
//   <h5>{translations?.not_enough_referrals}</h5>
// )}
// {userData?.total_refs >= 1 ?
