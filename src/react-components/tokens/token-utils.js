import { fetchReticulumAuthenticated, getReticulumFetchUrl } from "../../utils/phoenix-utils.js";
import { defineMessages } from "react-intl";

const ENDPOINT = "/api/v2_alpha/credentials";
const CREDENTIALS_ENDPOINT_URL = getReticulumFetchUrl(ENDPOINT);

export async function fetchMyTokens() {
  return fetchReticulumAuthenticated(ENDPOINT).then(function(tokens) {
    console.log(tokens);
    return tokens.credentials;
  });
}

function getHeaders() {
  return {
    "content-type": "application/json",
    authorization: `bearer ${window.APP.store.state.credentials.token}`
  };
}

export async function createToken({ scopes }) {
  console.log(scopes);
  const res = await fetch(CREDENTIALS_ENDPOINT_URL, {
    headers: getHeaders(),
    method: "POST",
    body: JSON.stringify({
      scopes,
      subjec_type: "account"
    })
  });
  if (res.ok) {
    return res.json();
  } else {
    console.log(res.status);
    console.log(res.statusText);
    throw new Error(res.statusText);
  }
  // TODO handle error case
}

export async function revokeToken({ id }) {
  console.log("trying revoke...");
  const res = await fetch(`${CREDENTIALS_ENDPOINT_URL}/${id}?revoke`, {
    headers: getHeaders(),
    method: "PUT",
    body: JSON.stringify({
      id,
      revoke: true
    })
  });
  if (res.ok) {
    return res.json();
  } else {
    console.log(res.status);
    console.log(res.statusText);
    throw new Error(res.statusText);
  }
}

export function fetchAvailableScopes() {
  // TODO turn into a fetch
  // fetch(`${CREDENTIALS_ENDPOINT}/scopes`, {
  //   headers: getHeaders()
  // })
  return ["read_rooms", "write_rooms"];
}