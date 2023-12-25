import { currentUser } from "@clerk/nextjs";

export default function SubmitPage() {
  const user = currentUser();

  function createPost() {}

  return (
    <div className="p-4">
      <main className="flex h-full  items-start justify-center">
        <form className="flex  w-full flex-col gap-2 md:max-w-3xl">
          <label htmlFor="title">Post title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="rounded-md  p-2 text-slate-950 shadow-sm"
          />
          <div className=" ">
            <label htmlFor="website-url" className="block py-2 text-gray-500">
              Website URL
            </label>
            <div className="flex items-center rounded-md border text-gray-400">
              <div className="rounded-l-md border-r bg-gray-50 px-3 py-2.5">
                https://
              </div>
              <input
                type="text"
                placeholder="www.example.com"
                id="website-url"
                className="ml-2 w-full bg-transparent p-2.5 outline-none"
              />
            </div>
          </div>
          <label htmlFor="desc">Post description</label>
          <input
            type="text"
            name="desc"
            id="desc"
            className="rounded-md  p-2 text-slate-950 shadow-sm"
          />
          <div className="flex w-full items-center justify-center pt-2">
            <button type="submit" className="rounded-full border-2 px-8 py-2">
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
