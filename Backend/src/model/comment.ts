import { connection } from "../config/db";
import { IComment } from "../interfaces/comment";

export default class Comment {
    static getAll = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT comment.id, comment.comment  , blog.title , user.name , comment.createdAt   FROM comment JOIN user ON comment.id_user = user.id JOIN blog ON comment.id_blog = blog.id"
            connection.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }

    static getCmtbyBlog = (id_blog: number) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT comment.comment as comment, user.name as user  FROM comment JOIN user ON comment.id_user = user.id WHERE comment.id_blog = ?"
            connection.query(sql, [id_blog], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }
    static createCmt = (cmt: IComment) => {
        return new Promise((resolve, reject) => {
            const { comment, id_user, id_blog } = cmt;
            connection.query("INSERT INTO comment (comment, id_user, id_blog) VALUES (?, ?, ?)", [comment, id_user, id_blog], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }
    static deleteCmt = (id: number) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM comment WHERE id = ?", [id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }
}