import mongoose from "mongoose";
import slug from 'mongoose-slug-updater'

mongoose.plugin(slug)

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true},
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