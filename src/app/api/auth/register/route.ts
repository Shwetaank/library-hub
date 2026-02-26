import { handleRegister } from "@/modules/auth/auth.controller";

/**
 * =========================================================
 * REGISTER ROUTE
 * =========================================================
 * Endpoint: POST /api/auth/register
 *
 * This file acts as the HTTP entry point.
 *
 * Responsibilities:
 * - Receive incoming POST request
 * - Delegate request handling to controller
 *
 * Important:
 * - No business logic should live here
 * - No validation logic here
 * - No database logic here
 *
 * Route layer must stay thin.
 * Controller handles request processing.
 * Service handles business logic.
 * Repository handles DB interaction.
 * =========================================================
 */

export async function POST(req: Request) {
  return handleRegister(req);
}
