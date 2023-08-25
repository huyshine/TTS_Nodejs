import commentService from "../services/comment.js";
import { commentSchema } from "../schemas/comments.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await commentService.getAllComments();
    res.status(200).json({
      message: "Get all comments successfully!",
      data: comments,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getCommentByBlog = async (req, res) => {
  try {
    // console.log("req.params.id: ", req.params.id);
    const comments = await commentService.getCommentByBlog(req.params.id);
    if (comments) {
      return res.status(200).json(comments);
    }else{
        return res.status(400).json({
            message: "Get comments by blog failed!",
        });
    }
  } catch (error) {
    res.status(500).json({
      message: "Get comments by blog failed",
      error: error.message,
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const { error } = commentSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const comment = await commentService.createComment(req.body);
    if (comment) {
      return res.status(200).json({
        message: "Create comment successfully!",
        data: comment,
      });
    } else {
      return res.status(400).json({
        message: "Create comment failed!",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await commentService.deleteComment(req.params.id);
    res.status(200).json({
      message: "Delete comment successfully!",
      data: comment,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


export const trashComment = async (req, res) => {
  try {
    const comments = await commentService.trashComment();
    res.status(200).json({
      message: "Get all comments successfully!",
      data: comments,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


export const restoreComment = async (req, res) => {
  try {
    const comment = await commentService.restoreComment(req.params.id);
    res.status(200).json({
      message: "Delete comment successfully!",
      data: comment,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const featuresComment = async (req, res) => {
  try {
    const comment = await commentService.featuresComment(req.params.id);
    res.status(200).json({
      message: "Delete comment successfully!",
      data: comment,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

