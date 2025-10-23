import { connectDB } from "@/lib/ConnectDB";
import Food from "@/lib/models/food";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: Request) => {
  await connectDB();
  const food = await Food.find();
  return NextResponse.json({
    message: "Food data retrieved successfully",
    food,
  });
};

export const POST = async (request: Request) => {
  await connectDB();
  const formData = await request.formData();

  const foodName = formData.get("foodName") as string;
  const ingredients = formData.get("foodIngredients") as string;
  const price = formData.get("foodPrice") as string;
  const categoryId = formData.get("foodCategoryId") as string;
  const image = formData.get("foodImage") as File;

  const uploadedUrl = await uploadImageToCloudinary(image);

  const result = await Food.create({
    foodName: foodName,
    foodIngredients: ingredients,
    foodPrice: Number(price),
    foodCategoryId: categoryId,
    foodImage: uploadedUrl,
  });

  if (result) {
    return NextResponse.json(
      { message: "Food item received successfully" },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "Food Failed to create" },
      { status: 400 }
    );
  }
};

export const DELETE = async (request: Request) => {
  const body = await request.json();

  const food = await Food.findByIdAndDelete(body._id);

  return NextResponse.json({ message: "Food deleted successfully...", food });
};
