const { z } = require("zod");

// Creating an object schema
const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(200, { message: "Name must not be at more 200 characters long" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters long" })
    .max(200, {
      message: "Email must not be at more than 200 characters long",
    }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .max(10, { message: "Phone must not be at more than 10 characters long" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(4, { message: "Password must be at least 4 characters" })
    .max(1024, "Password can't be greater than 1024 characters"),
});

module.exports = signupSchema;