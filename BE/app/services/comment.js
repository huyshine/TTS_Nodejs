// import Comment from '../models/comments';
import Comment from "../models/comments.js";
import Blog from "../models/blog.js";
import User from "../models/user.js";

export const getAllComments = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const comment = await Comment.find({})
        .populate("userId", "name")
        .populate("blogId", "title");
      if (comment) {
        return resolve(comment);
      } else {
        reject({
          message: "Get all comments failed!",
        });
      }
    } catch (error) {
      reject(error.message);
    }
  });
};

export const getCommentByBlog = (idBlog) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log("idBlog: ", idBlog);
      const blog = await Blog.find({
        _id: idBlog,
      });
      if (blog.length === 0) {
        reject({
          message: "Không tìm thấy bài viết này",
        });
      }
      const comment = await Comment.find({
        blogId: idBlog,
      }).populate("userId", "name  avatar");
      // .populate("blogId", "title content userId");
      if (comment.length !== 0) {
        return resolve({
          status: 200,
          message: "Get comments by blog successfully!",
          data: comment,
        });
      } else if (comment.length === 0) {
        return resolve({
          status: 200,
          message: "Bài Blog này không có bình luận",
          data: comment,
        });
      }
    } catch (error) {
      reject({
        status: 500,
        message: error.message,
      });
    }
  });
};

export const createComment = (comment) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAuthor = await User.findById(comment.userId);
      if (!checkAuthor) {
        reject({
          status: 404,
          message: "Khong tim thay thong tin nguoi dung !",
        });
      }

      const checkBlog = await Blog.findById(comment.blogId);
      if (!checkBlog) {
        reject({
          status: 404,
          message: "Khong tim thay thong tin nguoi dung !",
        });
      }

      const commentNew = await Comment.create(comment);
      if (!commentNew)
        return reject({
          status: 404,
          message: "Create comment failed",
        });
      const user = await User.findByIdAndUpdate(commentNew.userId, {
        $addToSet: { comments: commentNew },
      });
      if (!user)
        return reject({
          status: 404,
          message: "Create comment failed with user",
        });
      const post = await Blog.findByIdAndUpdate(commentNew.blogId, {
        $addToSet: { comments: commentNew },
      });
      if (!post)
        return reject({
          status: 404,
          message: "Create comment failed with blog",
        });
      return resolve(commentNew);
    } catch (error) {
      reject({
        status: 404,
        message: "Thêm bình luận thất bại !",
      });
    }
  });
};

export const deleteComment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.findByIdAndUpdate(id, { $pull: { comments: id } });
      await Blog.findByIdAndUpdate(id, { $pull: { comments: id } });
      const comment = await Comment.delete({ _id: id });
      if (!comment)
        return reject({
          status: 404,
          message: "Delete comment failed",
        });
      return resolve(comment);
    } catch (error) {
      reject({
        message: "Delete comment failed",
        error: error.message,
      });
    }
  });
};

export const trashComment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const comment = await Comment.findDeleted({
        deletedAt: { $ne: null },
        // deleted: true,
      })
        .populate("userId", "name")
        .populate("blogId", "title");
        console.log("comment", comment);
      if (comment) {
        return resolve(comment);
      } else {
        reject({
          message: "Get all comments failed!",
        });
      }
    } catch (error) {
      reject({
        message: "Delete comment failed",
        error: error.message,
      });
    }
  });
};

export const restoreComment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.findByIdAndUpdate(id, { $addToSet: { comments: id } });
      await Blog.findByIdAndUpdate(id, { $addToSet: { comments: id } });
      const comment = await Comment.restore({ _id: id});
      if (!comment)
        return reject({
          status: 404,
          message: "Delete comment failed",
        });
      return resolve(comment);
    } catch (error) {
      reject({
        message: "Delete comment failed",
        error: error.message,
      });
    }
  });
};

export const featuresComment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.findByIdAndUpdate(id, { $pull: { comments: id } });
      await Blog.findByIdAndUpdate(id, { $pull: { comments: id } });
      const comment = await Comment.deleteOne({ _id: id});
      if (!comment)
        return reject({
          status: 404,
          message: "Delete comment failed",
        });
      return resolve(comment);
    } catch (error) {
      reject({
        message: "Delete comment failed",
        error: error.message,
      });
    }
  });
};

const commentService = {
  getAllComments,
  createComment,
  deleteComment,
  getCommentByBlog,
  trashComment,
  restoreComment,
  featuresComment,
};

export default commentService;
