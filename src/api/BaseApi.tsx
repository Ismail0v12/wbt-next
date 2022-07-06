import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const BASE_API = "https://whitebridge.site/api";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const tokenSession =
    typeof window !== "undefined" && sessionStorage.getItem("accessSession");
  const tokenCookie =
    typeof window !== "undefined" && localStorage.getItem("access");
  const token = tokenSession || tokenCookie;
  if (token !== null) {
    // @ts-ignore
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  console.clear();

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.clear();
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.clear();
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (error.response) {
    // Access Token was expired
    if (error.response.status === 401) {
      const storedToken =
        sessionStorage.getItem("refreshSession") ||
        localStorage.getItem("refresh");

      await axios
        .post(BASE_API + "/token/refresh/", {
          refresh: storedToken,
        })
        .then((res) => {
          if (res) {
            const { access } = res.data;
            document.location.reload();
            if (sessionStorage.getItem("refreshSession")?.length !== 0) {
              sessionStorage.setItem("accessSession", access);
            } else {
              localStorage.setItem("access", access);
            }
          }
        })
        .catch(() => console.clear());
    }
  }
  return Promise.reject(error);
};

const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};

const axiosApi = setupInterceptorsTo(
  axios.create({
    baseURL: BASE_API,
  })
);

export async function getData(url: string, lang?: any, country?: any) {
  const res = await axiosApi.get(url + `lang=${lang}&country=${country}`);
  return res;
}

export async function getDataWithToken(url: string, lang: any, country: any) {
  const res = await axios.get(url + `?lang=${lang}&country=${country}`);
  if (!res.statusText) {
    throw new Error(
      `Could not fetch url: ${res.request}, status:${res.statusText}`
    );
  }

  return res;
}

export async function postData(url: string, data: object) {
  const res = await axiosApi.post(url, data);
  if (!res.statusText) {
    throw new Error(
      `Could not fetch url: ${res.request}, status:${res.statusText}`
    );
  }
  return res;
}

export async function postDataWithToken(url: string, data: object) {
  const res = await axiosApi.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.statusText) {
    throw new Error(
      `Could not fetch url: ${res.request}, status:${res.statusText}`
    );
  }
  return res;
}

export async function patchData(url: string, data: object) {
  const res = await axiosApi.patch(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.statusText) {
    throw new Error(
      `Could not fetch url: ${res.request}, status:${res.statusText}`
    );
  }
  return res;
}

export async function putData(
  url: string,
  data: object,
  contentType = "application/json"
) {
  const res = await axiosApi.put(url, data, {
    headers: {
      "Content-Type": contentType,
    },
  });
  if (!res.statusText) {
    throw new Error(
      `Could not fetch url: ${res.request}, status:${res.statusText}`
    );
  }
  return res;
}

export async function deleteData(url: string) {
  const res = await axiosApi.delete(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.statusText) {
    throw new Error(
      `Could not fetch url: ${res.request}, status:${res.statusText}`
    );
  }
  return res;
}
