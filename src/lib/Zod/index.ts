import z from "zod";

export const signupFormSchema = z.object({
  name:z.string().min(3,{
    message:"Name must be at least 3 characters."
  }), 
  username: z.string().min(2,{
      message: "Username must be at least 2 characters.",
  }),
  email:z.email(),
  password:z.string().min(8,{
    message:"Password must be at least 8 characters."
  }).max(16,{
    message:"Password cannot be greater than 16 characters."
  })
})