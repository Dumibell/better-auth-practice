import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";

export const auth = betterAuth({
  database: createPool({
    host: "localhost",
    user: "root",
    password: process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
    database: process.env.NEXT_PUBLIC_BETTER_AUTH_DATABASE,
    timezone: "Z", // Important to ensure consistent timezone values
  }),

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

  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  secret: process.env.NEXT_PUBLIC_BETTER_AUTH_SECRET,
});
