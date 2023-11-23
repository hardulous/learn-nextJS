import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  // Here callbacks consist of async function that will execute after some operation is done
  callbacks: {
    jwt: async function ({ token, user }) {
      console.log("jwt 11", token);
      console.log("jwt 12", user);
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async function ({ session, token }) {
      session.user.id = token.id;   // Now session object also contain custo .id property 
      return session;    
    },
  },
});

// Here we have implemented github authentication and when we make request to "/api/auth/signin" then we will see a signin page by nextAuth library and when we sign in we will be redirected to the url we have mentioned in github -> developer setting -> oAuth gihub app , and cookie of authenticated user will be stored in browser
