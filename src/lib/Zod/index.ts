import z from "zod";

export const signupFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(16, {
      message: "Password cannot be greater than 16 characters.",
    }),
});

export const signinFormSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(16, {
      message: "Password cannot be greater than 16 characters.",
    }),
});

export const PostFormSchema = z.object({
  caption: z.string().max(200, {
    message: "maximum limit for caption is 200 words",
  }),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(4, {
      message: "Location should be at least 4 characters",
    })
    .max(100, {
      message: "maximum limit for location is 100 characters",
    }),
  tags: z
    .string()
    .min(4, {
      message: "tags should be at least 4 characters",
    })
    .max(100, {
      message: "maximum limit for tags is 100 characters",
    }),
});

export const ProfileFormSchema = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.email(),
  bio: z.string(),
});
