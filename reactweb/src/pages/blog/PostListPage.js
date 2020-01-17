import React, {useCallback, useEffect, useState} from "react";
import {Button} from "antd";
import {getPostList} from "api/BlogAPI";
import PostDetailPage from "pages/blog/PostDetailPage";
import styles from "pages/blog/PostListPage.module.scss";


export default function PostListPage() {
  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState([]);

  const loadPostList = useCallback(() => {
    setLoading(true);

    getPostList()
      .then(postList => {
        setPostList(postList);
      })
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
        <PostDetailPage key={post.pk} {...post} />
      ))}

      <hr />
      <Button>New Post</Button>
      <Button onClick={loadPostList}>새로고침</Button>
    </div>
  );
}
