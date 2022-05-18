import axios from "axios";
import AuthToken from "./token";
import { SERVER_BASE_URL } from "./urls";

const http = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = AuthToken.getToken();
    if (token) config.headers.common["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

const postRequest = (url, data, resolve, reject) => {
  const requestUrl = SERVER_BASE_URL + url;

  http
    .post(requestUrl, data)
    .then((res) => {
      resolve(res);
    })
    .catch((error) => {
      reject(error);
    });
};

const getRequest = (url, data, resolve, reject) => {
  const requestUrl = SERVER_BASE_URL + url;

  http
    .get(requestUrl, data)
    .then((res) => {
      resolve(res);
    })
    .catch((error) => {
      reject(error);
    });
};

const putRequest = (url, data, resolve, reject) => {
  const requestUrl = SERVER_BASE_URL + url;

  http
    .put(requestUrl, data)
    .then((res) => {
      resolve(res);
    })
    .catch((error) => {
      reject(error);
    });
};

const patchRequest = (url, data, resolve, reject) => {
  const requestUrl = SERVER_BASE_URL + url;

  http
    .patch(requestUrl, data)
    .then((res) => {
      resolve(res);
    })
    .catch((error) => {
      reject(error);
    });
};

const deleteRequest = (url, data, resolve, reject) => {
  const requestUrl = SERVER_BASE_URL + url;

  http
    .delete(requestUrl, data)
    .then((res) => {
      resolve(res);
    })
    .catch((error) => {
      reject(error);
    });
};

export default {
  getRequest,
  postRequest,
  putRequest,
  patchRequest,
  deleteRequest,
};
