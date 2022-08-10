import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { LinkQuery } from "../link-query";
import { deleteData, postDataWithToken } from "../../api/BaseApi";
import { postView } from "../../api/ProductApi";
import { Image } from "../image";
import { Modal } from "../modal";
import TranslationContext from "../../providers/translation-context";
import ShareLinksContext from "../../providers/share-links-context";
import AuthenticationContext from "../../providers/authentication-context";
import ThumbUpIcon from "../assets/icons/ThumbUpIcon";
import SendIcon from "../assets/icons/SendIcon";
import EyeOpenIcon from "../assets/icons/EyeOpenIcon";
import ChevronRightIcon from "../assets/icons/ChevronRightIcon";
import { ProductInterface } from "../../Interfaces/ProductInterface";
import { ShareLinksInterface } from "../../Interfaces/ShareLinksInterface";
import CountrySelectContext from "../../providers/country-select-context";
import { useRouter } from "next/router";

interface CardProps {
  readonly cardData: ProductInterface | undefined;
}

const Card = ({ cardData }: CardProps) => {
  // const [liked, setLiked] = useState<{ id: number } | null>(null);
  const [views, setViews] = useState<number | undefined>(cardData?.views);
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  // const { isAuthorized } = useContext(AuthenticationContext);
  const { shareLinks } = useContext(ShareLinksContext);
  const { translations } = useContext(TranslationContext);
  const { selectedCountry } = useContext(CountrySelectContext);
  const { locale, push } = useRouter();
  // useEffect(() => {
  //   if (isAuthorized && cardData?.like != null) {
  //     setLiked({ id: cardData.like.id });
  //   }
  // }, [cardData?.like, isAuthorized]);

  // function likeHandler() {
  //   if (liked === null) {
  //     postDataWithToken("/like/", {
  //       entity: cardData?.id,
  //     })
  //       .then((res) => {
  //         if (res) {
  //           setLiked({ id: res.data.id });
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     deleteData(`/like/${liked.id}/`).then((res) => {
  //       if (res) {
  //         setLiked(null);
  //       }
  //     });
  //   }
  // }

  return (
    <>
      <div className="card">
        <div
          className="card__img"
          onClick={() => {
            setViews((view) => view && view++);
          }}
        >
          <span
            onClick={() =>
              push(
                {
                  pathname: `/category/${cardData?.category.id}/${cardData?.id}?country=${selectedCountry}`,
                  query: { id: cardData?.category.id, productId: cardData?.id },
                },
                `/category/${cardData?.category.id}/${cardData?.id}?country=${selectedCountry}`,
                {
                  locale,
                }
              )
            }
          >
            <Image
              // @ts-ignore
              src={cardData?.photos[0]}
              height={328}
              width={436}
              objectFit="contain"
              alt={cardData?.title}
            />
          </span>

          {cardData?.sale !== null && (
            <div className="card__sale">
              <span>SALE -{cardData?.sale}%</span>
            </div>
          )}
        </div>
        <div className="card__body">
          <div className="card__text">
            <LinkQuery
              passHref
              href={`/category/${cardData?.category.id}?country=${selectedCountry}`}
            >
              <span>{cardData?.category.title}</span>
            </LinkQuery>
            <h4>{`${cardData?.title} ${cardData?.title_2}`}</h4>
          </div>
          <div className="card__info">
            <div className="card__status">
              {/* {isAuthorized && (
                <span
                  onClick={likeHandler}
                  className={liked != null ? "active" : ""}
                >
                  <ThumbUpIcon />
                </span>
              )} */}
              <span onClick={() => setShareOpen(true)}>
                <SendIcon />
              </span>
            </div>
            <div className="card__views">
              <span>
                <EyeOpenIcon />
              </span>
              <span>
                {translations?.views}: {views}
              </span>
            </div>
          </div>
          <a
            onClick={() => {
              postView(cardData?.id);
              setViews((view) => view && view + 1);
            }}
            href={cardData?.link}
            target="_blank"
            rel="noreferrer"
            className="button"
          >
            <span>
              {translations?.see_more}
              <ChevronRightIcon />
            </span>
          </a>
        </div>
      </div>

      {shareOpen &&
        ReactDOM.createPortal(
          <Modal
            setModal={setShareOpen}
            title={translations && translations["share"]}
          >
            <div className="share">
              {shareLinks.map(
                ({ id, title, prefix_link, icon }: ShareLinksInterface) => (
                  <a
                    onClick={() => setShareOpen(false)}
                    target="_blank"
                    href={
                      prefix_link +
                      `https://whitebridge.club/${locale}/category/${cardData?.category.id}/${cardData?.id}?country=${selectedCountry}`
                    }
                    rel="noreferrer"
                    key={id}
                  >
                    <h5>{title}</h5>
                    <Image src={icon} width={25} height={25} alt={title} />
                  </a>
                )
              )}
            </div>
          </Modal>,
          document.getElementById("__next") as HTMLDivElement
        )}
    </>
  );
};

export { Card };
