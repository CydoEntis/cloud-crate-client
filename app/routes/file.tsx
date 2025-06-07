import { Form, Link, NavLink, redirect, useFetcher, useNavigate, useNavigation } from "react-router";
import type { Route } from "./+types/file";

// Make a client side API call
export async function clientLoader({ params }: Route.LoaderArgs) {
  const fileId = params.fileId;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${fileId}`);

  return await res.json();
}

//  Make a server side call directly to db
// export async function loader({params}: Route.LoaderArgs) {
//   const product = await db.posts.findFirst({
//     where: {
//       id: params.fileId
//     }
//   })
// }

// Fake a delay to see loading status.
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Make a client side API call that needs to mutate some kind of data.
export async function clientAction({ params }: Route.ClientActionArgs) {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${params.fileId}`, {
      method: "DELETE",
    });

    // 👇 Add delay here
    await delay(2000);

    return { isDeleted: true };
  } catch (err) {
    return { isDeleted: false };
  }
}

const FilePage = ({ loaderData }: Route.ComponentProps) => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isNavigating = Boolean(navigation.location);

  const fetcher = useFetcher();
  const isDeleted = fetcher.data?.isDeleted;
  const isDeleting = fetcher.state !== "idle";

  if (isNavigating) {
    setTimeout(() => {}, 3000);
    return <p>Navigating...</p>;
  }

  return (
    <div>
      {!isDeleted && (
        <>
          <h1>Title: {loaderData.title}</h1>
          <p>Body: {loaderData.body}</p>
        </>
      )}
      <Link to="/about">About</Link>
      <button onClick={() => navigate("/")}>Redirect</button>
      <fetcher.Form method="delete">
        <button type="submit">Delete</button>
      </fetcher.Form>

      {isDeleting && <p>Deleting post</p>}
    </div>
  );
};

export default FilePage;
