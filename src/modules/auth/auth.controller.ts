import { z } from "zod";
import { registerSchema, loginSchema } from "./auth.schema";
import { registerUser, loginUser } from "./auth.service";
import { serialize } from "cookie";

/**
 * =========================================================
 * AUTH CONTROLLER
 * =========================================================
 * This file handles HTTP-level authentication requests.
 *
 * Responsibilities:
 * - Parse incoming request
 * - Validate request body using Zod schemas
 * - Call service layer for business logic
 * - Handle errors safely
 * - Manage authentication cookies
 *
 * NOTE:
 * Business logic (hashing, JWT creation, DB calls)
 * MUST remain inside the service layer.
 * Controllers should stay thin.
 * =========================================================
 */

/**
 * ---------------------------------------------------------
 * REGISTER HANDLER
 * ---------------------------------------------------------
 * Endpoint: POST /api/auth/register
 *
 * Flow:
 * 1. Parse JSON body from request
 * 2. Validate input using registerSchema
 * 3. Call registerUser service
 * 4. Return success response
 *
 * Security Notes:
 * - Password hashing is handled inside service layer
 * - No JWT is generated during registration
 */
export const handleRegister = async (req: Request) => {
  try {
    // Step 1: Parse incoming request body
    const body = await req.json();

    // Step 2: Validate request body
    const validated = registerSchema.safeParse(body);

    if (!validated.success) {
      // Format validation errors using Zod v4 tree structure
      const formattedErrors = z.treeifyError(validated.error);

      return Response.json({ errors: formattedErrors }, { status: 400 });
    }

    // Step 3: Call service layer to create user
    await registerUser(validated.data);

    // Step 4: Return success response
    return Response.json(
      { message: "User registered successfully" },
      { status: 201 },
    );
  } catch (error: unknown) {
    /**
     * Catch unexpected runtime errors
     * (DB failures, environment misconfigurations, etc.)
     */
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 500 });
    }

    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};

/**
 * ---------------------------------------------------------
 * LOGIN HANDLER
 * ---------------------------------------------------------
 * Endpoint: POST /api/auth/login
 *
 * Flow:
 * 1. Parse JSON body
 * 2. Validate input using loginSchema
 * 3. Authenticate user via service layer
 * 4. Generate JWT (inside service)
 * 5. Store JWT inside secure HTTP-only cookie
 * 6. Return success response
 *
 * Security:
 * - Cookie is HTTP-only (prevents XSS access)
 * - Secure flag enabled in production (HTTPS only)
 * - SameSite "strict" prevents CSRF attacks
 */
export const handleLogin = async (req: Request) => {
  try {
    // Step 1: Parse incoming request body
    const body = await req.json();

    // Step 2: Validate login input
    const validated = loginSchema.safeParse(body);

    if (!validated.success) {
      const formattedErrors = z.treeifyError(validated.error);

      return Response.json({ errors: formattedErrors }, { status: 400 });
    }

    // Step 3: Authenticate user & generate JWT
    const { token } = await loginUser(
      validated.data.email,
      validated.data.password,
    );

    /**
     * Step 4: Serialize JWT into secure cookie
     */
    const cookie = serialize("token", token, {
      httpOnly: true, // Prevent JS access
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "strict", // CSRF protection
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    /**
     * Step 5: Return response with Set-Cookie header
     */
    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    /**
     * Authentication errors (invalid credentials)
     * or unexpected runtime issues.
     */
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 401 });
    }

    return Response.json({ message: "Invalid credentials" }, { status: 401 });
  }
};
