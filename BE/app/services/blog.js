import Blog from "../models/blog.js";
import Comment from "../models/comments.js";
import User from "../models/user.js";

export const getAllBlogs = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const blog = await Blog.find().populate("userId", "name email").populate("comments", "comment");
            resolve(blog);
        } catch (error) {
            reject(error.message);
        }
    });
}

export const getBlogById = (slug) => {
    return new Promise(async (resolve, reject) => {
        try {
            const blog = await Blog.findOne({ slug: slug}).populate("userId", "name email").populate("comments", "comment userId");
            if(blog === null) return reject({
                status: 404,
                message: "Blog not found"
            });
            resolve(blog);
        } catch (error) {
            reject({
                status: 404,
                message: "Lỗi không tìm thấy bài viết này !"
            });
        }
    });
}

export const createBlog = (blog) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const { userId } = blog;
            // const { userId } = blog;
            const checkUser = await User.findOne({ _id: blog.userId });
            if(!checkUser) return reject({
                status: 404,
                message: "User khoong ton tai !"
            })

            // await User.findByIdAndUpdate(userId, { $addToSet: { blogs: blog._id } })
            const blogNew = await Blog.create(blog);

            if(!blogNew) return reject({
                status: 404,
                message: "Create blog failed"
            });
            return resolve(blogNew);
        } catch (error) {
            reject(error.message);
        }
    });
}

export const updateBlog = (id, blog) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBlog = await Blog.findOne({ _id: id });
            console.log("checkBlog" , checkBlog);
            if(!checkBlog) return reject({
                status: 404,
                message: "Không tìm thấy bài viết này !"
            })
            const checkUser = await User.findOne({ _id: blog.userId });
            if(!checkUser) return reject({
                status: 404,
                message: "User khong ton tai !"
            })


            const blogUpdate = await Blog.findByIdAndUpdate(id, blog);
            console.log("blogUpdate", blogUpdate);
            if(!blogUpdate) return reject({
                    status: 404,
                    message: "Blog not found"
                });
            return resolve(blogUpdate);
        } catch (error) {
            reject({
                status: 404,
                message: "Update thất bại!",
                error: error.message
            });
        }
    });
}

export const deleteBlog = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Comment.deleteMany({ blogId: id });
            const blog = await Blog.findByIdAndDelete(id);
            if(!blog) return reject({
                status: 404,
                message: "Không tìm thấy sản phẩm cần xóa !"
            });
            return resolve(blog);
        } catch (error) {
            reject({
                status: 404,
                message: "Delete thất bại!",
                errors : error.message
            });
        }
    });
}
const BlogServices = { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog };

export default BlogServices ;