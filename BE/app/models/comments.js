import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";


const CommentSchema = new mongoose.Schema({
    comment: { type: String, required: true},
    blogId: { 
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true},
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true}    
}, {
    timestamps: true,
    versionKey: false
    }
)

// Plugin configuration
mongoose.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all"
})

export default mongoose.model("Comment", CommentSchema)