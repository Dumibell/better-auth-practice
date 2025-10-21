import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import path from "path";

export const auth = betterAuth({
  database: new Database(path.join(process.cwd(), "sqlite.db")),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // 테스트 해보기
    requireEmailVerification: false,
  },

  // socialProviders: {
  //   google: {
  //     clientId: "YOUR_GOOGLE_CLIENT_ID",
  //     clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
  //   },
  // },

  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
});
