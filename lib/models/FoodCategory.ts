import { Schema, model, models } from "mongoose";

const FoodCategorySchema = new Schema(
  {
    categoryName: { type: String, required: true },
  },

  {
    timestamps: true,
  }
);

const FoodCategory =
  models.FoodCategory || model("FoodCategory", FoodCategorySchema);

export default FoodCategory;
