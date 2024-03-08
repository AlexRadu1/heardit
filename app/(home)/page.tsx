import { getPosts } from "../lib/data";
import ScrollableList from "../components/ui/ScrollableList";
import { getSpotifyToken } from "../lib/utils";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const posts = await getPosts();
  const user = await currentUser();
  let spotifyAccessToken = await getSpotifyToken(user);

  return (
    <div className=" ">
      <main className="flex flex-col items-center justify-center py-4">
        <ScrollableList token={spotifyAccessToken} posts={posts} />
      </main>
    </div>
  );
}
