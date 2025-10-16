import { connectDB } from "@/lib/ConnectDB";
import Food from "@/lib/models/food";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";
import { NextRequest, NextResponse } from "next/server";

await connectDB();

export async function POST(request: NextRequest) {
  const formData = await request.formData();
const image = formData.get("image") as File;
const uploadedUrl = await uploadImageToCloudinary(image);

export const GET = async (request: Request) => {
  const food = await Food.find();
  return NextResponse.json({
    message: "Food data retrieved successfully",
    food,
  });
};

export const POST = async (request: Request) => {
  const body = await request.json();
  console.log(body);
  const food = await Food.create({
    foodName: body.foodName,
    foodPrice: body.foodPrice,
    foodImage: body.foodImage,
    FoodIngredients: body.foodIngredients,
    FoodCategoryName: body.FoodCategoryName,
  });

  return NextResponse.json({ message: "Food added successfully", food });
};

export const DELETE = async (request: Request) => {
  const body = await request.json();

  const food = await Food.findByIdAndDelete(body._id);

  return NextResponse.json({ message: "Food deleted successfully...", food });
};
