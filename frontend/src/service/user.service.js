import config from "../config/config";

export async function user_login(data) {
  const res = await fetch(config.api + `/auth/login`, {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });

  const dataRes = await res.json();
  return dataRes;
}