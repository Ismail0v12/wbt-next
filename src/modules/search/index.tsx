import React, { useEffect, useState } from "react";
import { ListItems } from "../../components/list-items";
import { getData } from "../../api/BaseApi";
import { useRouter } from "next/router";
import { DataInterface } from "../../Interfaces/DataInterface";

function SearchPage() {
  const [data, setData] = useState<DataInterface | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const parsedSearch = new URLSearchParams(router.pathname).get("term");
  const [term, setTerm] = useState<string | any>(parsedSearch);

  useEffect(() => {
    getData(`/entities/?term=${parsedSearch}`, router.locale)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [parsedSearch, router.locale]);

  function onSearch(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/search?term=${term}?country=${router.query.country}`);
  }

  return (
    <ListItems
      data={data?.results}
      loading={loading}
      term={term}
      setTerm={setTerm}
      onSearch={onSearch}
      title="Search"
    />
  );
}

export default SearchPage;
