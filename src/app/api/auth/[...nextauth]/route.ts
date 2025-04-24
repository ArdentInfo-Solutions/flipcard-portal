import NextAuth, { type DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Extend the built-in session type to include id
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

// if (!clientId || !clientSecret) {
//   throw new Error("Google OAuth client credentials (GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET) are missing.");
// }
declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      // clientId: process.env.GOOGLE_CLIENT_ID!,
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      clientId: clientId || "",
      clientSecret: clientSecret || "",

    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
  // secret: process.env.NEXTAUTH_SECRET,
  // debug:true,
})

export { handler as GET, handler as POST };

