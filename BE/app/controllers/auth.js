import { signup  , signin } from "../services/auth.js"
import userServices from "../services/auth.js"
import {signInSchema , signupSchema} from "../schemas/auths.js"

export const register = async (req, res) => {
    try {
        const {name, email, password , confimPassword} = req.body
        const { error } = await signupSchema.validate({
            name,
            email,
            password,
            confimPassword
        },{abortEarly: false})
        if(error) {
            const errors = error.details.map((error) => error.message);
            return res.status(400).json({
                message: errors
            })
        }

        const user = await signup(req.body)
        
        return res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const { error } = await signInSchema.validate({
            email,
            password
        }, {abortEarly: false})

        if(error) {
            const errors = error.details.map((error) => error.message);
            return res.status(400).json({
                message: errors
            })
        }

        const user = await signin(req.body)
        if(user) {
            return res.status(200).json(user)
        }
        
    } catch (error) {
        return res.status(500).json({
            satatus: 'error',
            message: error.message
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await userServices.getAllUsers()
        return res.status(200).json({
            status: "success",
            message: "Get all users successfully",
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}