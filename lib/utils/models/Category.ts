import mongoose, { Schema } from "mongoose"

type CategorySchemaType = {
    name: string
};

const CategorySchema: Schema = new Schema ({
    name: String,
});

export default mongoose.models.Category || mongoose.model<CategorySchemaType>("Category", CategorySchema)
