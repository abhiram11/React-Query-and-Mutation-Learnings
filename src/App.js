import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const fetcher = (url) => fetch(url).then((r) => r.json());

function App() {
  // const [viewPost, setViewPost] = useState(false);
  const [viewPostId, setViewPostId] = useState(null);

  const { isLoading: allPostsLoading, data: posts } = useQuery(
    "posts",
    () => fetcher("https://jsonplaceholder.typicode.com/posts"),
    {
      cacheTime: 1000,
      staleTime: 1000,
      enabled: false,
      initialData: "Hi I am the initial Data!!",
      select: (data) => data.slice(0, 5), //question whether it should be data or posts here!
    }
  );

  // const { body: postData } = useQuery("post", () => {
  //   if (viewPostId) {
  //     fetcher(`https://jsonplaceholder.typicode.com/posts/${viewPostId}`);
  //     console.log("Post Data:" + postData);
  //   }
  // });

  // console.log("query data:\n", posts);
  console.log("View Post ID Changed:" + viewPostId);

  useEffect(() => {
    // console.log("View Post ID Changed:" + viewPostId);
  }, [viewPostId]);

  return (
    <div className="App">
      {allPostsLoading ? (
        <h3>Loading Data...</h3>
      ) : (
        <>
          <h3 style={{ textAlign: "center" }}>Content Loaded 👇🏻</h3>
          <ol>
            {posts.map((post) => (
              <li
                key={post.id}
                style={{ margin: "5px", cursor: "pointer" }}
                onClick={() => setViewPostId(post.id)}
              >
                {post.id} :{post.title}
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

export default App;

// 'https://jsonplaceholder.typicode.com/posts'
