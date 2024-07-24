import NextAuth, { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProviders from 'next-auth/providers/google';
import User from '@/app/models/User';
import bcrypt from 'bcrypt';
import { connectDB } from '@/app/lib/dbConnect';

const authConfig = {
  providers: [
    GoogleProviders({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'User Login',
      credentials: {
        email: {
          label: 'Email:',
          type: 'text',
          placeholder: 'your email',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'your password',
        },
      },
      async authorize(credentials) {
        //await connectDB();
        //const email = credentials?.email as string | undefined;
        //const password = credentials?.password as string | undefined;

        //if (!email || !password) return null;

        //const user = await User.findOne({ email });
        //if (user && bcrypt.compareSync(password, user.password)) {
        //  return { id: user._id.toString(), name: user.username, email: user.email };
        //}
        //return null;
        //hardcoded user for testing
        const user = {
          id: '42',
          name: 'user1',
          email: 'user1@gmail.com',
          password: '12345',
        };

        // Extract credentials from the request
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (email === user.email && password === user.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      console.log("Session data:", session); // Debugging log
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
      }
      console.log("JWT token:", token); // Debugging log
      return token;
    },
  },
  
} satisfies NextAuthConfig;

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(authConfig);
