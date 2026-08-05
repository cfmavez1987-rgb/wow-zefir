import { NextResponse } from "next/server";
import {
  verifyAdminPassword,
  createAdminSession,
  verifyAdminSession,
  destroyAdminSession,
} from "@/lib/admin-auth";

export async function GET() {
  const authenticated = await verifyAdminSession();
  return NextResponse.json({ authenticated });
}

export async function POST(request: Request) {
  const { password } = await request.json();

  const isValid = await verifyAdminPassword(password);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ success: true });
}

export async function DELETE() {
  await destroyAdminSession();
  return NextResponse.json({ success: true });
}
