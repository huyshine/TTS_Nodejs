import Joi from 'joi';

export const blogSchema = Joi.object({
    title: Joi.string().min(6).required().messages({
        "string.min": `"title" phải có ít nhất {#limit} ký tự`,
        "string.base": `"title" phải là kiểu "text"`,
        "string.empty": `"title" không được bỏ trống`,
        "any.required": `"title" là trường bắt buộc`,
    }),
    content : Joi.string().required().messages({
        "string.base": `"content" phải là kiểu "text"`,
        "string.empty": `"content" không được bỏ trống`,
        "any.required": `"content" là trường bắt buộc`,
    }),
    image : Joi.string().required().messages({}),
    id_user : Joi.number().required()
});