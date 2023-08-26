import mongoose from "mongoose";
import slug from 'mongoose-slug-updater'

mongoose.plugin(slug)

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true},
    image: { type: String, required: true , default: "https://aquacityvn.vn/wp-content/uploads/2021/03/ngay-quoc-khanh-2-9-vao-thu-may.jpg"},
    content: { type: String, required: true},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    userId: { 
        type: String, 
        ref: "User",
        required: true},
    slug: { type: String, slug: "title", unique: true }, 
}, {
    timestamps: true,
    versionKey: false
})


export default mongoose.model("Blog", BlogSchema)