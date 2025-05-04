import { z } from "zod";

export const createAdoptionSchema = {
    body: z.object({
        owner: z.string().regex(/^[a-f\d]{24}$/i, { message: "Must be an ObjectId!" }),
        pet: z.string().regex(/^[a-f\d]{24}$/i, { message: "Must be an ObjectId!" })
    })
}

export const getAdoptionSchema = {
    params: z.object({
        id: z.string().regex(/^[a-f\d]{24}$/i, { message: "Must be an ObjectId!" })
    })
}
