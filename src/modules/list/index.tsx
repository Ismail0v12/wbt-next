import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { ListItems } from "../../components/list-items";
import { LoadingIcon } from "../../components/assets/icons/LoadingIcon";
import { axiosApi, getData } from "../../api/BaseApi";
import { BannerInterface } from "../../Interfaces/BannerInterface";
import { Footer } from "../../components/footer";

interface ListPageProps {
  readonly data: any;
}

const ListPage = ({ data }: ListPageProps) => {
  const [banner, setBanner] = useState<BannerInterface[] | undefined>(
    undefined
  );
  const [contentLoading, setContentLoading] = useState(false);
  const [term, setTerm] = useState("");
  const [currentData, setData] = useState<{} | any>();
  const location = useRouter();

  const queryid = location.query.id ? location.query.id : false;

  useEffect(() => {
    setData(data);
    if (queryid !== false) {
      getData(
        `/banners/${queryid}/per-category/?`,
        location.locale,
        location.query.country
      )
        .then((res) => {
          setBanner(res.data);
        })
        .catch((err) => console.log(err));
    }
    return () => {
      setData({});
    };
  }, [queryid, location.query.country, location.locale]);

  function handleForm(e: React.ChangeEvent) {
    setContentLoading(true);
    e.preventDefault();
    getData(
      `/entities/${location.query.id}/per-category/?term=${term}&`,
      location.locale,
      location.query.country
    )
      .then((res) => {
        setData(() => {
          return {
            category: {
              title: res.data.category.title,
            },
            next: res.data.next,
            previous: res.data.previous,
            count: res.data.count,
            results: res.data.results,
          };
        });
        setContentLoading(false);
      })
      .catch((err) => {
        if (err) {
          alert("Something went wron please try again!");
          setContentLoading(false);
        }
      });
  }

  const infinterScroll = useCallback(() => {
    if (currentData.next !== null) {
      axiosApi
        .get(currentData.next)
        .then((res) => {
          setData(() => {
            return {
              category: {
                title: res.data.category.title,
              },
              next: res.data.next,
              previous: res.data.previous,
              count: res.data.count,
              results: [...currentData?.results, ...res.data.results],
            };
          });
          setContentLoading(false);
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    }
  }, [location, setData, currentData]);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (
        currentData &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 400
      ) {
        infinterScroll();
      }
    });
  }, [currentData]);

  return (
    <section className="list-page">
      <ListItems
        data={currentData?.results}
        banner={banner}
        setTerm={setTerm}
        term={term}
        title={currentData?.category?.title}
        onSearch={handleForm}
      />
      {contentLoading && <LoadingIcon />}
      <Footer />
    </section>
  );
};

export default ListPage;
