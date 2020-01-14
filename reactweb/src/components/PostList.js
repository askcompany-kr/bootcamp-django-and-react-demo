import React, {useCallback, useContext, useEffect, useState} from "react";
import styles from "./PostList.module.scss";
import PostDetail from "./PostDetail";
import axiosInstance from "../api";
import {AppContext} from "../AppContext";


export default function PostList({ history, location }) {
  const { state: { jwtToken } } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState(null);
  const [error, setError] = useState();

  const loadPostList = useCallback(() => {
    setLoading(true);

    const Authorization = `Token ${jwtToken}`;
    const headers = { Authorization };
    axiosInstance.get("/blog/", { headers })
      .then(response => {
        const { data } = response;
        setPostList(data);
      })
      .catch(error => {
        setError(error);
        console.error(error);

        // 에러를 처리하는 공통 모듈을 둘까?
        if ( error.response.status === 401 ) {
          setTimeout(() => {
            const nextUrl = encodeURIComponent(location.pathname + location.search);
            history.push(`/accounts/login/?next=${nextUrl}`);
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [history, location, jwtToken]);

  useEffect(() => {
    loadPostList();
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
