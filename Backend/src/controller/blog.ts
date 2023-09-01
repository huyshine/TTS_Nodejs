import Blog from "../model/blog";
import { blogSchema } from "../validate/blog";

export const getAll = async (req:any, res:any) => {
  try {
    const data = await Blog.getAll();
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getOne = async (req:any, res:any) => {
  try {
    const data = await Blog.getOne(req.params.id);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const create = async (req:any, res:any) => {
  try {
    const { error } = await blogSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        status: "fail",
        message: errors,
      });
    }

    const blog = req.body;
    const data = await Blog.create(blog);
    res.status(200).json({
      status: "Thêm bài viết thành công",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const update = async (req:any, res:any) => {
  try {
    const { error } = await blogSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        status: "fail",
        message: errors,
      });
    }

    const data = await Blog.update(
      req.params.id,
      req.body,
    );
    res.status(200).json({
      status: "Update thành công",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const deleteOne = async (req:any, res:any) => {
  try {
    // const find = await Blog.getOne(req.params.id);
    // if (!find) {
    //   return res.status(404).json({
    //     status: "fail",
    //     message: "Không tìm thấy bài viết",
    //   });
    // }
    const data = await Blog.delete(req.params.id);
    res.status(200).json({
      status: "Xóa thành công",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
