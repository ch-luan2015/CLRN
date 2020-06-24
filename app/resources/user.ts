import api from "./api";
import * as Bluebird from "bluebird";
export interface User {
  id: number;
  name: string;
  token: string;
  email: string;
  phone: string;
}

export async function login(phone: string) {
  await Bluebird.delay(1000);
  return api.get<User>(`/login?phone=${phone}`);
}
