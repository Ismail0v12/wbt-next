import React from "react";
import Image from "next/image";
import useSWR from "swr";
import { getData } from "../../api/BaseApi";

interface AuthPartnerDataProp {
  id: number;
  image: string;
}

const AuthPartners = () => {
  const { data } = useSWR("/partners/?", getData);

  const images = data?.data.map(({ image, id }: AuthPartnerDataProp) => (
    <Image key={id} src={image} alt="whitebridge.club" />
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
