import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user) {
        return false;
      }
      await dbConnect();

      const curEmail = user?.email || `fb_${account.id}`;
      const curUser = await User.findOne({ email: curEmail });

      if (curUser) {
        return true;
      }

      const newUser = new User({
        email: user?.email || `fb_${account.id}`,
        name: user.name || '',
        avatar: user.image || '',
        isOAuth: true,
      });

      await newUser.save();

      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    // async session({ session, user, token }) {
    //   return session
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token
    // }
  },
};
export default NextAuth(authOptions);
