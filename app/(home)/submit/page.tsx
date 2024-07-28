import { AddFrom } from "../../components/ui/add-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create post",
  description: "Submition form to create a new post",
};

export default async function SubmitPage() {
  return (
    <main className="p-4">{/* <AddFrom token={spotifyAccessToken} /> */}</main>
  );
}
