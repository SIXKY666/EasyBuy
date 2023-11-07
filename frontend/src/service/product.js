import config from "../config/config";

export async function product_get(data) {
  const res = await fetch(config.api + `/product/get`, {
    body: JSON.stringify(data),
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  const dataRes = await res.json();
  return dataRes;
}
export async function product_add(data) {
  const res = await fetch(config.api + `/product/add`, {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });

  const dataRes = await res.json();
  return dataRes;
}