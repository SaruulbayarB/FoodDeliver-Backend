import { connectDB } from "@/lib/ConnectDB";
import FoodCategory from "@/lib/models/FoodCategory";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  await connectDB();
  const category = await FoodCategory.find();
  return NextResponse.json({ message: "Success", category });
};

export const POST = async (request: Request) => {
  await connectDB();
  const body = await request.json();

  const category = await FoodCategory.create({
    categoryName: body.categoryName,
  });

  return NextResponse.json({ message: "Success", category });
};

export const DELETE = async (request: Request) => {
  await connectDB();
  const body = await request.json();

  const category = await FoodCategory.findByIdAndDelete(body._id);

  return NextResponse.json({ message: "Deleted successfully...", category });
};
