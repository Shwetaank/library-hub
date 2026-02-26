import { handleLogin } from "@/modules/auth/auth.controller";

/**
 * =========================================================
 * LOGIN ROUTE
 * =========================================================
 * Endpoint: POST /api/auth/login
 *
 * Purpose:
 * - Accept user credentials (email + password)
 * - Delegate authentication logic to controller
 *
 * Responsibilities of this file:
 * - Act as HTTP entry point
 * - Forward request to controller layer
 *
 * Important Architecture Rule:
 * - No validation logic here
 * - No business logic here
 * - No database calls here
 *
 * Route Layer      → Handles HTTP
 * Controller Layer → Handles request processing
 * Service Layer    → Handles authentication logic
 * Repository Layer → Handles database operations
 * =========================================================
 */

export async function POST(req: Request) {
  return handleLogin(req);
}
