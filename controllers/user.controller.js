import User from "../models/User.js"
import bcrypt from "bcrypt"

export const create = async (req, res) => {
    const userExist = await new Promise((resolve, reject) => {
        User.findByUsername(req.body.username, (err, data) => {
            if (err) {
                if (err.type === 'not_found') {
                    // res.status(404).send({
                    //     message: `Not Found user with username : ${req.body.username}`
                    // })

                    // Username Belum Terdaftar
                    resolve(false)
                } else {
                    // res.status(500).send({msg: "Exist some error"})

                    // Ada Error
                    reject(err)
                }
            } else {
                // res.send(data)

                // Username Sudah Terdaftar
                resolve(true)
            }
        })
    })

    if (userExist) {
        return res.status(400).json({ message: "Username Already Exist" })
    }

    const encryptPassword = await bcrypt.hash(req.body.password, 10)

    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: encryptPassword,
        phone_number: req.body.phone_number,
        role: req.body.role
    })

    User.create({ name: req.body.name, username: req.body.username, password: encryptPassword, phone_number: req.body.phone_number, role: req.body.role })
    res.status(201).json({ msg: "User Created Successfully" })

    // User.create(newUser, (err, data) => {
    //     if (err) {
    //         res.status(500).send({ msg: "Exist some error" })
    //         return
    //     }
    //     res.send(data)
    // })
}

export const findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            res.status(500).send({ msg: "Exist some error" })
            return
        }
        res.send(data)
    })
}

export const findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.type === 'not_found') {
                res.status(404).send({
                    message: `Not Found user with id : ${req.params.id}`
                })
            } else {
                res.status(500).send({ msg: "Exist some error" })
            }
        } else {
            res.send(data)
        }
    })
}

export const update = (req, res) => {
    const userData = new User(req.body)
    User.update(req.params.id, userData, (err, data) => {
        if (err) {
            if (err.type === 'not_found') {
                res.status(404).send({
                    message: `Not Found user with id : ${req.params.id}`
                })
            } else {
                res.status(500).send({ msg: "Exist some error" })
            }
        } else {
            res.send(data)
        }
    })
}

export const updatePassword = async (req, res) => {
    const encryptPassword = await bcrypt.hash(req.body.password, 10)
    const userData = new User({ password: encryptPassword })
    User.updatePassword(req.params.id, userData, (err, data) => {
        if (err) {
            if (err.type === 'not_found') {
                res.status(404).send({
                    message: `Not Found user with id : ${req.params.id}`
                })
            } else {
                res.status(500).send({ msg: "Exist some error" })
            }
        } else {
            res.send(data)
        }
    })
}

export const destroy = (req, res) => {
    User.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.type === 'not_found') {
                res.status(404).send({
                    message: `Not Found user with id : ${req.params.id}`
                })
            } else {
                res.status(500).send({ msg: "Exist some error" })
            }
        } else {
            res.send({ msg: "Success delete user" })
        }
    })
}