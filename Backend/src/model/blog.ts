import { connection } from "../config/db";
import { IBlog } from "../interfaces/blog";


export default class Blog {
    static getAll = () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT blog.id, blog.title, blog.content, blog.image, blog.createAt, user.name FROM blog JOIN user ON blog.id_user = user.id", (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }

    static getOne = (id: number) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM blog WHERE id = ?", [id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }

    static create = (blog : IBlog) => {
        return new Promise((resolve, reject) => {
            const { title, content, image, id_user } = blog;
            connection.query("INSERT INTO blog (title, content, image, id_user) VALUES (?, ?, ?, ?)", [title, content, image ,id_user], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }

    static update = (id: number, blog : IBlog) => {
        return new Promise((resolve, reject) => {
            const { title, content, image, id_user } = blog;
            connection.query("UPDATE blog SET title = ?, content = ?, image = ? , id_user = ? WHERE id = ?", [title, content, image , id_user ,id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }


    static delete = (id: number) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM blog WHERE id = ?", [id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }


}




