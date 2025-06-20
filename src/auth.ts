import { AuthOptions, getServerSession } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret:
        process.env.AUTH_GITHUB_SECRET ||
        (() => {
          throw new Error("GITHUB_SECRET is not defined");
        })(),
    }),
    Google({
      clientId:
        process.env.AUTH_GOOGLE_ID ||
        (() => {
          throw new Error("GOOGLE_ID is not defined");
        })(),
      clientSecret:
        process.env.AUTH_GOOGLE_SECRET ||
        (() => {
          throw new Error("GOOGLE_SECRET is not defined");
        })(),
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
