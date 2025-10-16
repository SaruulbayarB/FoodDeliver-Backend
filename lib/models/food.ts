import { Schema, model, models } from "mongoose";
import { unique } from "next/dist/build/utils";
import FoodCategory from "./FoodCategory";

const FoodSchema = new Schema(
  {
    foodName: { type: String, required: true },
    foodPrice: { type: String, required: true },
    foodImage: { type: String, required: false },
    FoodIngredients: { type: String, required: false },
    FoodCategoryName: { type: Schema.ObjectId, ref: FoodCategory },
  },

  {
    timestamps: true,
  }
);

const Food = models.Food || model("Food", FoodSchema);

export default Food;
