import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new NextResponse("Email and password are required", { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return new NextResponse("Email already in use", { status: 400 });
  }

  const hashedPassword = await hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      hashedPassword,
    },
  });

  return new NextResponse("User created", { status: 201 });
}
