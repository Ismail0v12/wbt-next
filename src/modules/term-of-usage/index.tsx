import React, { useEffect, useState } from "react";
import { StaticPagesInterface } from "../../Interfaces/StaticPagesInterface";
import { getData } from "../../api/BaseApi";
import { AuthHeader } from "../../layouts/auth-layout/auth-header";

function TermOfUsePage() {
  const [data, setData] = useState<StaticPagesInterface | any>(null);
  useEffect(() => {
    getData("/static-pages/term-of-use/").then((res) => setData(res.data));
  }, []);
  return (
    <section>
      <AuthHeader />
      <div className="container" style={{ paddingTop: "20px" }}>
        <article
          dangerouslySetInnerHTML={{ __html: data && data.content }}
          style={{ color: "white!important" }}
        />
      </div>
    </section>
  );
}

export default TermOfUsePage;
