"use server";
import prisma from "@/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export async function handleForm(formData: FormData) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const schema = z.string();
  const linkParser = z.string().url();
  const contParser = z.string().nullable();

  const rawFormData: Prisma.PostCreateInput = {
    title: schema.parse(formData.get("title")),
    link: linkParser.parse(formData.get("link")),
    content: contParser.parse(formData.get("desc")),
    authorId: userId,
  };

  const createPost = await prisma.post.create({
    data: rawFormData,
  });
  console.log(rawFormData);
  redirect("/");
}
