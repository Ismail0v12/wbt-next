import React from "react";
import useSWR from "swr";
import { getCurrentCountry } from "../../api/BaseApi";

interface AuthPartnerDataProp {
  id: number;
  photo: string;
}

const AuthPartners = () => {
  const { data } = useSWR("/partners/?", getCurrentCountry);

  const images = data?.data.map(({ photo, id }: AuthPartnerDataProp) => (
    <img src={photo} alt="White Bridge Club" key={id} />
  ));

  return (
    <>
      {data?.data.length === 0 ? null : (
        <div className="auth__partners">{images}</div>
      )}
    </>
  );
};

export { AuthPartners };
