import React from "react";
import styles from "./PostDetail.module.scss";


export default function PostDetail({ pk, message, updated_at }) {
  return (
    <div className={styles.post_detail}>
      <h3>
        포스팅 #{pk}
      </h3>
      <small>{updated_at}</small>
      {message}
    </div>
  );
}
