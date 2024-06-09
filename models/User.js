import sql from "./Connection.js"
import { Sequelize, DataTypes } from "sequelize"

// Inisialisasi Sequelize dengan MySQL sebagai database
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
});

// Definisi model User
const User = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM,
        values: ['superadmin', 'admin', 'staff'],
        allowNull: false,
        defaultValue: 'admin'
    }
}, {
    freezeTableName: true
});

// Sinkronisasi model dengan database (membuat tabel jika belum ada)
(async () => {
    await db.sync()
})()

// const User = function (user) {
//     this.name = user.name
//     this.username = user.username
//     this.password = user.password
//     // this.phone_number = user.phone_number
//     this.role = user.role
// }

const tableName = 'users'

// User.create = (newUser, result) => {
//     sql.query(`INSERT INTO ${tableName} SET ?`, newUser, (err, res) => {
//         if (err) {
//             result(err, null)
//             return
//         }
//         result(null, { id: res.insertId, newUser })
//     })
// }

User.getAll = (result) => {
    sql.query(`SELECT * FROM ${tableName}`, (err, res) => {
        if (err) {
            result(err, null)
            return
        }
        result(null, res)
    })
}

User.findById = (id, result) => {
    sql.query(`SELECT * FROM ${tableName} WHERE id = ${id}`, (err, res) => {
        if (err) {
            result(null, res[0])
            return
        }

        // Jika data ditemukan
        if (res.length) {
            result(null, res[0])
            return
        }

        // Jika kosong
        result({ type: 'not_found' }, null)
    })
}

User.findByUsername = (username, result) => {
    sql.query(`SELECT * FROM ${tableName} WHERE username = ?`, username, (err, res) => {
        if (err) {
            result(null, res)
            return
        }

        // Jika data ditemukan
        if (res.length) {
            result(null, res[0])
            return
        }

        // Jika kosong
        result({ type: 'not_found' }, null)
    })
}

User.update = (id, data, result) => {
    sql.query(`UPDATE ${tableName} SET name = ?, username = ?, phone_number = ?, role = ? WHERE id = ?`,
        [data.name, data.username, data.phone_number, data.role, id], (err, res) => {
            if (err) {
                result(err, null)
                return
            }

            if (res.affectedRows == 0) {
                result({ type: 'not_found' }, null)
                return
            }

            result(null, { id: id, data })
        })
}

User.updatePassword = (id, data, result) => {
    sql.query(`UPDATE ${tableName} SET password = ? WHERE id = ?`,
        [data.password, id], (err, res) => {
            if (err) {
                result(err, null)
                return
            }

            if (res.affectedRows == 0) {
                result({ type: 'not_found' }, null)
                return
            }

            result(null, { id: id, data })
        })
}

User.delete = (id, result) => {
    sql.query(`DELETE FROM ${tableName} WHERE id = ?`, id, (err, res) => {
        if (err) {
            result(err, null)
            return
        }

        if (res.affectedRows == 0) {
            result({ type: 'not_found' }, null)
            return
        }

        result(null, res)
    })
}

export default User