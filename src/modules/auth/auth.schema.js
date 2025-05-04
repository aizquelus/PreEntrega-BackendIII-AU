import { z } from "zod";

export const loginSchema = {
    body: z.object(
        {
            email: z.string().email("Must be a valid email!"),
            password: z.string().min(6, "Password must be at least 6 characters long!")
        }
    )
}


export const registerSchema = {
    body: z.object({
        first_name: z.string().min(1),
        last_name: z.string().min(1),
        email: z.string().email("Must be a valid email!"),
        password: z.string().min(6, "Password must be at least 6 characters long!"),
        role: z.enum(["admin", "user"]).optional()
    })
}
