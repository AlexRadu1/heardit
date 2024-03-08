import prisma from "@/prisma/prisma";

export async function getPosts() {
  return prisma.post.findMany();
}
