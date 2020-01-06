import React, {useCallback, useEffect, useState} from "react";
import styles from "./PostList.module.scss";
import Axios from "axios";
import PostDetail from "./PostDetail";


export default function PostList() {
  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    loadPostList();
  }, []);

  const loadPostList = useCallback(() => {
    setLoading(true);
    Axios.get("http://localhost:8000/blog/")
      .then(response => {
        const { data } = response;
        setPostList(data);
      })
      .catch(error => {
        setError(error);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.post_list}>
      <h2>Post List</h2>

      <button onClick={loadPostList}>새로고침</button>

      {loading && <div>로딩 중 ...</div>}
      {error && <div>에러가 발생했습니다. {JSON.stringify(error)}</div>}

      {postList && postList.map(post => (
        <PostDetail key={post.pk} {...post} />
      ))}
    </div>
  );
}
