import { getData, postDataWithToken } from "./BaseApi";

export const postView = (id: number | undefined) => {
  return postDataWithToken("/view/", { entity: id });
};
export const bannerPostView = (id: number | undefined) => {
  return postDataWithToken("/banner-click/", { banner: id });
};

export const getDataById = async (
  id: number | unknown,
  lang: any,
  country: any
) => {
  return await getData(`/entities/${id}`, lang, country);
};

export const getCountryList = async () => {
  return await getData("/countries/list/");
};
