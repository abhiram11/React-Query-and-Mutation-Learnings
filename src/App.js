import { useQuery } from "react-query";

const fetcher = (url) => fetch(url).then((r) => r.json());

function App() {
  const { isLoading, data: posts } = useQuery("posts", () =>
    fetcher("https://jsonplaceholder.typicode.com/posts")
  );

  console.log("query data:\n", posts);

  return (
    <div className="App">
      {isLoading ? (
        <h3>Loading Data...</h3>
      ) : (
        <>
          <h3 style={{ textAlign: "center" }}>Content Loaded 👇🏻</h3>
          <ol>
            {posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

export default App;

// 'https://jsonplaceholder.typicode.com/posts'
