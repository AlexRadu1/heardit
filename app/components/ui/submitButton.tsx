"use client";

import { useFormStatus } from "react-dom";

export function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <button className="rounded-full border-2 px-8 py-2" aria-disabled={pending}>
      Submit
    </button>
  );
}
