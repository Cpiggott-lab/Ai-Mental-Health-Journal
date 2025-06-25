import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";

if (typeof window === "undefined") {
  const requiredEnvVars = [
    "AUTH_GOOGLE_ID",
    "AUTH_GOOGLE_SECRET",
    "AUTH_GITHUB_ID",
    "AUTH_GITHUB_SECRET",
    "NEXTAUTH_SECRET",
    "DATABASE_URL",
  ];

  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  });
}

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("Received credentials:", credentials);

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing email or password");
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          console.log("Fetched user:", user);

          if (!user || !user.hashedPassword) {
            throw new Error("No user found or missing hashed password");
          }

          const isValid = await compare(
            credentials.password,
            user.hashedPassword
          );
          console.log("Password validation result:", isValid);

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Error in authorize function:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      try {
        console.log("JWT callback - token:", token, "user:", user);
        if (user) {
          token.id = user.id;
        }
        return token;
      } catch (error) {
        console.error("Error in JWT callback:", error);
        throw error;
      }
    },
    async session({ session, token }) {
      try {
        console.log("Session callback - session:", session, "token:", token);
        if (session.user && token.id) {
          session.user.id = token.id as string;
        }
        return session;
      } catch (error) {
        console.error("Error in Session callback:", error);
        throw error;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
