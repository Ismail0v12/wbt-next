import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { ListItems } from "../../components/list-items";
import LoadingIcon from "../../components/assets/icons/LoadingIcon";
import { getData } from "../../api/BaseApi";
import { DataInterface } from "../../Interfaces/DataInterface";
import { BannerInterface } from "../../Interfaces/BannerInterface";

const ListPage = () => {
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState<BannerInterface[] | undefined>(
    undefined
  );
  const [data, setData] = useState<DataInterface | any>([]);
  const [contentLoading, setContentLoading] = useState(false);
  const [term, setTerm] = useState("");
  const location = useRouter();

  const queryid = location.query.id ? location.query.id : false;

  useEffect(() => {
    if (queryid !== false) {
      getData(
        `/entities/${queryid}/per-category/?`,
        location.locale,
        location.query.country
      )
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));

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
  }, [queryid, location.query.country, location.locale]);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 150
      ) {
        if (data?.next != null) {
          setContentLoading(true);
          getData(
            `/entities/${queryid}/per-category?`,
            location.locale,
            location.query.country
          )
            .then((res) => {
              setData((state: any) => {
                return {
                  category: {
                    title: res.data.category.title,
                  },
                  next: res.data.next,
                  previous: res.data.previous,
                  count: res.data.count,
                  results: [
                    ...res.data.results,
                    // @ts-ignore
                    ...state.results,
                  ],
                };
              });
              setContentLoading(false);
            })
            .catch((err) => console.log(err));
        }
      }
    });
  }, [data?.next, setData, queryid]);

  function handleForm(e: React.ChangeEvent) {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        if (err) {
          alert("Something went wron please try again!");
          setLoading(false);
        }
      });
  }

  return (
    <section className="list-page">
      <ListItems
        data={data?.results}
        banner={banner}
        loading={loading}
        setTerm={setTerm}
        term={term}
        title={data.category?.title}
        onSearch={handleForm}
      />
      {contentLoading && <LoadingIcon />}
    </section>
  );
};

export default ListPage;
