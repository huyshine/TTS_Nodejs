import { connection } from "../config/db";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'
import { IUser } from "../interfaces/user";
dotenv.config()

export default class User {
    // static signin =  (user: IUser) => {
    //     return new Promise(async (resolve, reject) => {
    //         connection.query("SELECT * FROM user", (err, result) => {
    //             if (err) reject(err);
    //             resolve(result);
    //         })
    //     })
    // }
    
    static signup =  (user: IUser) => {
        return new Promise(async (resolve, reject) => {
            const { name, email, password } = user;
            const passwordHash = await bcrypt.hash(password , 10);
            connection.query(`INSERT INTO user (name, email, password, id_role) VALUES (?, ? ,? ,?)`, [`${name}`, `${email}`, `${passwordHash}`, 2], (err, result :any) => {
                if (err) reject(err);
                resolve(result.insertId);
            })
        })
    }

    static getUserByEmail = (email: string) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }

    static getAllUser = () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT user.id , user.name , user.email , user.avatar, role.name AS role FROM user JOIN role ON user.id_role = role.id", (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }

    static getDetailUser = (id : number) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM user WHERE id = ?",[id],(err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }

}


