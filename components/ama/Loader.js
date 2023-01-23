import React from "react";
import { Comment } from "react-loader-spinner";
/* eslint-disable */
function Loader({ loading }) {
  return (
    <Comment
      visible={loading}
      height="60"
      width="60"
      ariaLabel="comment-loading"
      wrapperStyle={{}}
      wrapperClass="comment-wrapper"
      color="#fff"
      backgroundColor="#40414f"
    />
  );
}

export default Loader;
