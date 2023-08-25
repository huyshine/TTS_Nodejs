import BlogServices from "../services/blog.js";
import { blogSchema } from "../schemas/blogs.js";

export const getAllBlogs = async (req, res) => {
    try {
        const blog = await BlogServices.getAllBlogs();
        if(!blog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json({
            message: "Get all blogs successfully",
            data: blog
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const auth = async (req, res) => {
    try {
        const blog = await BlogServices.getAllBlogs();
        if(!blog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json({
            message: "Get all blogs successfully",
            data: blog
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBlogById = async (req, res) => {
    const { slug } = req.params;
    try {
        const blog = await BlogServices.getBlogById(slug);
        if(!blog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json({
            message: "Get detail blog successfully",
            data: blog
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createBlog = async (req, res) => {
    try {
        const { error } =  await blogSchema.validate(req.body, { abortEarly: false });
        if(error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({ message: errors });
        }
        const blog = req.body;

        const blogNew = await BlogServices.createBlog(blog);
        if(blogNew){
            return res.status(201).json({
                message: "Create blog successfully",
                data: blogNew
            });
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateBlog = async (req, res) => { 
    try {
        const { id } = req.params;
        const blog = req.body;

        const { error } =  await blogSchema.validate(blog, { abortEarly: false });
        if(error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({ message: errors });
        }
        const blogUpdate = await BlogServices.updateBlog(id, blog);
        if(blogUpdate){
            return res.status(200).json({
                message: "Update blog successfully",
                dataNew: blog
            });
        }else{
            return res.status(404).json({
                message: "Update blog failed",
            });
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await BlogServices.deleteBlog(id);
        if(blog){
            return res.status(200).json({
                message: "Delete blog successfully",
            });
        }
    } catch (error) {
        return res.status(404).json({ 
            message: error.message
         });
    }


}

