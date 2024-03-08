import { AddFrom } from "../../components/ui/add-form";
import { Metadata } from "next";
import { handleForm } from "./actions";

export const metadata: Metadata = {
  title: "Create post",
  description: "Submition form to create a new post",
};

export default async function SubmitPage() {
  return (
    <div className="p-4">
      <main className="flex h-full  items-start justify-center">
        <AddFrom />
      </main>
    </div>
  );
}
