import { LOGIN, LOGOUT } from "./types";
import { User } from "app/resources/user";

export function setUser(user: User) {
  return {
    type: LOGIN,
    payload: user,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
