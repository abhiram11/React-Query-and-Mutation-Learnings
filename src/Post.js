import React from "react";
import { useQuery } from "react-query";

const fetcher = (url) => fetch(url).then((r) => r.json());

function Post() {
  const { body: postData } = useQuery("post", () =>
    fetcher(`https://jsonplaceholder.typicode.com/posts/`)
  );

  return <div>This is Posts!</div>;
}

export default Post;
