const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Username must be provided" })
    .trim()
    .min(4, { message: "Username must be at least 4 characters" }),

  email: z
    .string({ required_error: "Email must be provided" })
    .trim()
    .email({ message: "Email invalid" })
    .min(4, { message: "Email must be at least 4 characters" })
    .max(200, { message: "Email must be not more than 200 characters" }),

  password: z
    .string({ required_error: "Password must be provided" })
    .trim()
    .min(4, { message: "Password must be at least 4 characters" })
    .max(50, { message: "Password must be not more than 50 characters" }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .max(13, { message: "Phone number must be not more than 13 characters" }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email must be provided" })
    .trim()
    .email({ message: "Email invalid" })
    .min(4, { message: "Email must be at least 4 characters" })
    .max(200, { message: "Email must be not more than 200 characters" }),

  password: z
    .string({ required_error: "Password must be provided" })
    .trim()
    .min(4, { message: "Password must be at least 4 characters" })
    .max(50, { message: "Password must be not more than 50 characters" }),
});

module.exports = {
  signupSchema,
  loginSchema,
};
