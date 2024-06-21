const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "username is required" })
    .trim()
    .min(3, { message: "username must be at least 3 characters" })
    .max(200, { message: "username must be not more than 200 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(8, { message: "email must be at least 8 characters" })
    .max(200, { message: "email must be not more than 200 characters" }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .max(13, { message: "Phone number must be not more than 13 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(4, { message: "Password must be at 4 characters" })
    .max(50, { message: "Password must be not more than 50 characters" }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email must be required!" })
    .trim()
    .email({ message: "Invalid email!" })
    .min(9, { message: "Email must be at at 9 characters" })
    .max(200, { message: "email must be not more than 200 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(4, { message: "Password must be at 4 characters" })
    .max(50, { message: "Password must be not more than 50 characters" }),
});

module.exports = { signupSchema, loginSchema };
