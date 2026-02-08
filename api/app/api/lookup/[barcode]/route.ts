import { NextResponse } from "next/server";
import { lookupProduct } from "@/lib/products";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ barcode: string }> }
) {
  const { barcode } = await params;

  const product = lookupProduct(barcode);

  if (!product) {
    return NextResponse.json({ found: false, barcode }, { status: 404 });
  }

  return NextResponse.json({ found: true, product });
}
