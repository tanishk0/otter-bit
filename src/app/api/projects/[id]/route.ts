import { NextRequest, NextResponse } from "next/server";
import { getProject } from "@/lib/projects/projectLoader";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const loadedProject = await getProject(id);

    return NextResponse.json({
      success: true,
      data: loadedProject
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to load project" },
      { status: 404 }
    );
  }
}
