import axiosInstance from "./instance";

export function requestLogin({data}) {
  return axiosInstance.post("/accounts/login/", data)
    .then(response => {
      const {data: jwtToken} = response;
      return jwtToken;
    });
}
