import { api, updateAxiosHeader } from "@/helpers/axios.config";
import { getHeaderConfig, setHeaderConfig, setRoleId } from "@/helpers/utils";

export async function login(email, password) {
  let headerConfig = getHeaderConfig();
  let response = await api
    .post("auth/sign_in/", { email: email, password: password })
    .then((response) => {
      headerConfig = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "access-token": response.headers["access-token"],
          client: response.headers["client"],
          uid: response.headers["uid"],
        },
      };
      setHeaderConfig(headerConfig);
      setRoleId(response.data.data.user_role_id);
      updateAxiosHeader();
      return response;
    });
  // return response;
}

function register() {}

export async function getCurrentUserInfo() {
  let res = await api.get("user_info");
  if (res) return res.data;
  else return false;
}
