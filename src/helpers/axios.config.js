import axios from "axios";
import { baseUrl } from "@/app.config";
import { getHeaderConfig, clearAuthInfo } from "@/helpers/utils";
import { EventBus } from "@/eventBus";

export let api = axios.create({
  baseURL: baseUrl,
  timeout: 100000,
  headers: getHeaderConfig().headers,
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      clearAuthInfo();
      EventBus.$emit("unauthorized");
    } else {
      return error.response;
    }
  }
);

export function updateAxiosHeader() {
  api = axios.create({
    baseURL: baseUrl,
    timeout: 100000,
    headers: getHeaderConfig().headers,
  });

  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status == 401) {
        clearAuthInfo();
      }
    }
  );
}
