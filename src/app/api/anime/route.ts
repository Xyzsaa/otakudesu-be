import { NextResponse, NextRequest } from "next/server";
import anime from "@/utils/anime";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const data = await anime(params.slug);

    if (!data) {
      return NextResponse.json({ error: "Anime not found or scraping failed." }, { status: 404 });
    }

    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error: any) {
    console.error("Server Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
