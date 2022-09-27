import { headerConfigKeyName, userRoleIdKeyname } from "@/app.config";

export function getAuthState() {
  let auth_state = localStorage.getItem(headerConfigKeyName) ? true : false;
  return auth_state;
}

export function getRoleId() {
  return localStorage.getItem(userRoleIdKeyname)
    ? JSON.parse(localStorage.getItem(userRoleIdKeyname))
    : 0;
}

export function setRoleId(role_id) {
  localStorage.setItem(userRoleIdKeyname, role_id);
}

export function getHeaderConfig() {
  return localStorage.getItem(headerConfigKeyName)
    ? JSON.parse(localStorage.getItem(headerConfigKeyName))
    : {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
}

export function setHeaderConfig(header) {
  localStorage.setItem(headerConfigKeyName, JSON.stringify(header));
}

export function clearAuthInfo() {
  localStorage.removeItem(headerConfigKeyName);
  localStorage.removeItem(userRoleIdKeyname);
}

export function makeFilterString(filter_obj) {
  var filterString = "?";
  Object.keys(filter_obj).map(function (key) {
    if (filter_obj[key]) {
      filterString += key + "=" + filter_obj[key] + "&";
    }
  });
  return filterString;
}
