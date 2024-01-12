import axios, { AxiosInstance } from "axios";
import { setRequestOptions, setResponseOptions } from "./intercepter.js";

const APP_BASE_URI = "https://api.hnpwa.com/v0/";
const options = {};

// url: 프론트엔드에서 어느 서버로 접속할 건지에 대한 url
// function create, createWithAuth는 반환 타입이 AxiosInstace
function create(url: string, options = {}): AxiosInstance {
  const instance = axios.create(Object.assign({ baseURL: url }, options));
  return instance;
}

function createWithAuth(url: string, options = {}): AxiosInstance {
  const instance = axios.create(Object.assign({ baseURL: url }, options));
  setRequestOptions(instance);
  setResponseOptions(instance);
  return instance;
}

const news = create(`${APP_BASE_URI}news/`);
const user = createWithAuth(`${APP_BASE_URI}user/`, options);

export { news, user };
