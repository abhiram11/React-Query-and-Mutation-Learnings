import { useState } from "react";
import client from "./react.query-client";

import { useQuery } from "react-query";

const fetcher = (url) => fetch(url).then((r) => r.json());

function App() {
  // const [viewPost, setViewPost] = useState(false);
  const [viewPostId, setViewPostId] = useState(null);
  const [title, setTitle] = useState("");

  const { isLoading: allPostsLoading, data: posts } = useQuery(
    "posts",
    () => fetcher("https://jsonplaceholder.typicode.com/posts"),
    {
      cacheTime: 1000,
      staleTime: 1000,
      enabled: true,
      // initialData: () => "Hi I am the initial Data!!",
      select: (posts) => posts.slice(0, 5), //question whether it should be data or posts here!
    }
  );

  // const { body: postData } = useQuery("post", () => {
  //   if (viewPostId) {
  //     fetcher(`https://jsonplaceholder.typicode.com/posts/${viewPostId}`);
  //     console.log("Post Data:" + postData);
  //   }
  // });

  // console.log("query data:\n", posts);
  // console.log("View Post ID Changed:" + viewPostId);

  // useEffect(() => {
  // console.log("View Post ID Changed:" + viewPostId);
  // }, [viewPostId]);
  // const changeTitle = () => {
  //   posts[0].title = title;
  //   setTitle("");
  // };

  const cachedPosts = client.getQueryData(["posts", 0]);
  console.log("cached posts:", cachedPosts);

  return (
    <div className="App">
      {allPostsLoading ? (
        <h3>Loading Data...</h3>
      ) : (
        <>
          <h3 style={{ textAlign: "center" }}>Content Loaded 👇🏻</h3>
          <ol>
            {posts?.map((post) => (
              <li
                key={post.id}
                style={{ margin: "5px", cursor: "pointer" }}
                onClick={() => setViewPostId(post.id)}
              >
                {post.title}
              </li>
            ))}
          </ol>
          {viewPostId && <p>{posts[viewPostId - 1].body}</p>}
          <div>
            <h3 style={{ textAlign: "center" }}>
              Enter Text if you want to change the first title
            </h3>
            {/* <input
              // value={title}
              placeholder="Enter text..."
              onChange={(e) => {
                setTitle(e.target.value);
                client.setQueryData(["posts", 0, "title"], title);
                client.refetchQueries(["posts"]); 
              }}
              // client.setQueryData(["posts", 0, "title"], e.target.value)
            /> */}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

// 'https://jsonplaceholder.typicode.com/posts'
