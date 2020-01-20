import axiosInstance from "./instance";

export function requestLogin({data}) {
  const headers = { 'Authorization': '' };
  return axiosInstance.post("/accounts/login/", data, { headers })
    .then(response => {
      const {data: { errors, token: jwtToken } } = response;
      return { errors, jwtToken };
    });
}
