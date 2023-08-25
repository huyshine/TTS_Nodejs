import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        min: 6,
        max: 255,
    },
    avatar: { type: String, default: "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg" },
    email: { type: String, required: true},
    password: { type: String, required: true},
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
} , {
    timestamps: true,
    versionKey: false
})

export default mongoose.model("User", UserSchema)