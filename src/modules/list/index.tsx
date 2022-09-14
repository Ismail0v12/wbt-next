import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { ListItems } from "../../components/list-items";
import { LoadingIcon } from "../../components/assets/icons/LoadingIcon";
import { getData } from "../../api/BaseApi";
import { BannerInterface } from "../../Interfaces/BannerInterface";

interface ListPageProps {
  readonly data: any;
}

const ListPage = ({ data }: ListPageProps) => {
  const [banner, setBanner] = useState<BannerInterface[] | undefined>(
    undefined
  );
  const [contentLoading, setContentLoading] = useState(false);
  const [term, setTerm] = useState("");
  const [currentData, setData] = useState<{} | any>(data);
  const location = useRouter();

  const queryid = location.query.id ? location.query.id : false;

  useEffect(() => {
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
      getData(
        `/entities/${queryid}/per-category/?`,
        location.locale,
        location.query.country
      )
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
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

  const title = useMemo(() => {
    return currentData.category?.title;
  }, [currentData.category?.title]);

  console.log(title);

  return (
    <section className="list-page">
      <ListItems
        data={currentData?.results}
        banner={banner}
        setTerm={setTerm}
        term={term}
        title={title}
        onSearch={handleForm}
      />
      {contentLoading && <LoadingIcon />}
    </section>
  );
};

export default ListPage;
