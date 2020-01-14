import axiosInstance from "./instance";


export function getPostList() {
  return axiosInstance.get("/blog/")
    .then(response => {
      const { data: postList } = response;
      return postList;
    });
}
