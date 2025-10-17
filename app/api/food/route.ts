import { connectDB } from "@/lib/ConnectDB";
import Food from "@/lib/models/food";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";
import { NextRequest, NextResponse } from "next/server";

await connectDB();

// export async function POST = async (request: NextRequest) {
//   const formData = await request.formData();
//   const image = formData.get("image") as File;
//   const uploadedUrl = await uploadImageToCloudinary(image);
// }

export const GET = async (request: Request) => {
  const food = await Food.find();
  return NextResponse.json({
    message: "Food data retrieved successfully",
    food,
  });
};

export const POST = async (request: Request) => {
  const formData = await request.formData();

  const foodName = formData.get("foodName") as string;
  const ingredients = formData.get("FoodIngredients") as string;
  const price = formData.get("FoodPrice") as string;
  const categoryId = formData.get("categoryId") as string;
  const image = formData.get("FoodImage") as File;

  const uploadedUrl = await uploadImageToCloudinary(image);

  const result = await Food.create({
    name: foodName,
    ingredients,
    price: Number(price),
    categoryId,
    image: uploadedUrl,
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
