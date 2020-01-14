import React, {useCallback, useEffect, useState} from "react";
import styles from "./PostList.module.scss";
import PostDetail from "./PostDetail";
import axiosInstance from "../api";
import {Button} from "antd";


export default function PostList() {
  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState([]);

  const loadPostList = useCallback(() => {
    setLoading(true);

    axiosInstance.get("/blog/")
      .then(response => {
        const { data } = response;
        setPostList(data);
      })
      .catch(error => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadPostList();
  }, [loadPostList]);

  return (
    <div className={styles.post_list}>
      <h2>Post List</h2>

      {loading && <div>로딩 중 ...</div>}

      {postList.map(post => (
        <PostDetail key={post.pk} {...post} />
      ))}

      <hr />
      <Button>New Post</Button>
      <Button onClick={loadPostList}>새로고침</Button>
    </div>
  );
}
