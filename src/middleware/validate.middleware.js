// validate.middleware.js file

import { z } from "zod";

export const signupSchema = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, "Name must be at least 2 characters")
        .max(50, "Name must not exceed 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .toLowerCase()
        .email("Invalid email format")
        .max(255, "Email must not exceed 255 characters"),

    password: z
        .string({ required_error: "Password is required" })
        .min(4, "Password must be at least 8 characters")
        .max(64, "Password must not exceed 64 characters")

});

export const loginSchema = z.object({

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .toLowerCase()
        .email("Invalid email format")
        .max(255, "Email must not exceed 255 characters"),

    password: z
        .string({ required_error: "Password is required" })
        .min(4, "Password must be at least 8 characters")
        .max(64, "Password must not exceed 64 characters")

});



export const validate = (schema) => (req, res, next) => {

    const result = schema.safeParse(req.body);

    if (!result.success) {

        const errors = result.error.errors.map((e) => ({ field: e.path[0], message: e.message }));

        return res.status(422).json({ success: false, message: "Validation failed", errors });
    }


    req.body = result.data;
    next();
};