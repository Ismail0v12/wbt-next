import React, { useEffect, useState } from "react";
import { StaticPagesInterface } from "../../Interfaces/StaticPagesInterface";
import { getData } from "../../api/BaseApi";
import { AuthHeader } from "../../layouts/auth-layout/auth-header";
import { useRouter } from "next/router";
import BaseLayout from "../../layouts/base-layout";
import Spinner from "../../components/spinner";

function TermOfUsePage() {
  const [data, setData] = useState<StaticPagesInterface | any>(null);
  const { locale } = useRouter();

  useEffect(() => {
    getData("/static-pages/term-of-use/?", locale, "").then((res) =>
      setData(res.data)
    );
  }, [locale]);

  if (!data) {
    return <Spinner />;
  }

  return (
    <BaseLayout>
      <section>
        <AuthHeader />
        <div className="container" style={{ paddingTop: "20px" }}>
          <article
            dangerouslySetInnerHTML={{ __html: data && data.content }}
            style={{ color: "white!important" }}
          />
        </div>
      </section>
    </BaseLayout>
  );
}

export default TermOfUsePage;
