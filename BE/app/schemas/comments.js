import Joi from 'joi';

export const commentSchema = Joi.object({
    comment : Joi.string().required().messages({
        // "string.min" : `"title" phải có ít nhất {#limit} ký tự`,
        "string.base" : `"title" phải là kiểu "text"`,
        "string.empty" : `"title" không được bỏ trống`,
    }),
    blogId : Joi.string().required(),
    userId : Joi.string().required(),
})
