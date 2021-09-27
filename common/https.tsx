/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import UseLoaderContext from "./use-loader-context";

export let baseUrl: string;
if (process.env.NODE_ENV === "production") {
  baseUrl = "https://api.ontelo.io/";
} else {
  baseUrl = "http://localhost:3000/dev/";
}

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export const makeGetCall = async (
  url: string,
  params?: { [key: string]: any },
  isFullUrl?: boolean
) => {
  const baseUrlObj = isFullUrl
    ? {
        baseURL: "",
      }
    : {};
  return axiosInstance.request({
    ...baseUrlObj,
    method: "GET",
    url,
    params,
  });
};

export const makePostCall = async (
  url: string,
  params: { [key: string]: any },
  data?: any,
  isFullUrl?: boolean
) => {
  const baseUrlObj = isFullUrl
    ? {
        baseURL: "",
      }
    : {};
  return axiosInstance.request({
    ...baseUrlObj,
    method: "POST",
    url,
    params,
    data,
  });
};

export const makePutCall = async (
  url: string,
  params: { [key: string]: any },
  data?: any,
  isFullUrl?: boolean
) => {
  const baseUrlObj = isFullUrl
    ? {
        baseURL: "",
      }
    : {};
  return axiosInstance.request({
    ...baseUrlObj,
    url,
    method: "PUT",
    params,
    data,
  });
};

export const makeDeleteCall = async (
  url: string,
  params: { [key: string]: any },
  data?: any,
  isFullUrl?: boolean
) => {
  const baseUrlObj = isFullUrl
    ? {
        baseURL: "",
      }
    : {};
  return axiosInstance.request({
    ...baseUrlObj,
    method: "DELETE",
    url,
    data,
    params,
  });
};

/**
 * @param  url - URL without params - Ex:- /user
 * @param  params - params that neesds to be attachted to URL - Ex:- [1,3]
 * @returns URL padded with params i.e /user/1/3
 */
export const addParamsToUrl = (url: string, params: any[]) => {
  let urlWithParams = url;
  if (Array.isArray(params)) {
    params.forEach((param) => {
      urlWithParams = `${urlWithParams}/${param}`;
    });
  }
  return urlWithParams;
};

export const UseFetch = () => {
  /**
   * Request Interceptor i.e before making any API call this will be triggered
   */
  const loader = UseLoaderContext();
  axiosInstance.interceptors.request.use((request: any) => {
    loader.showLoader();
    // Add or modify header
    // console.log("API Triggered");
    return request;
  });

  /**
   * Response Interceptor i.e after api is resolved this will trigger
   */
  axiosInstance.interceptors.response.use(
    (response: any) => {
      loader.hideLoader();
      // Add code to handle Errors
      // console.log("API Done");
      return response;
    },
    (error: any) => {
      loader.hideLoader();
      return Promise.reject(error);
    }
  );

  const fetchRest = (request: {
    url: string;
    method: "GET" | "POST" | "DELETE" | "PUT";
    params?: any[];
    queryParams?: {
      [key: string]: any;
    };
    data?: any;
    isFullUrl?: boolean;
  }) => {
    const {
      url,
      method = "GET",
      params = [],
      queryParams = {},
      data,
      isFullUrl,
    } = request;
    let urlWithParams = params ? addParamsToUrl(url, params) : url;
    let restMethod = method.toUpperCase();
    switch (restMethod) {
      case "POST":
        return makePostCall(urlWithParams, queryParams, data, isFullUrl);
      case "PUT":
        return makePutCall(urlWithParams, queryParams, data, isFullUrl);
      case "DELETE":
        return makeDeleteCall(urlWithParams, queryParams, data, isFullUrl);
      default:
        return makeGetCall(urlWithParams, queryParams, isFullUrl);
    }
  };

  return { fetchRest };
};
