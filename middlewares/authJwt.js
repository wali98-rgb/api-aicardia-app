import jwt from 'jsonwebtoken'
import roleAccess from './roleAccess.js'

const authJwt = (req, res, next) => {
    // Get token
    const token = req.headers["authorization"]?.replace("Bearer ", "")
    if (!token) {
        // return res.status(401).send({message: "Missing access token"})
        throw new Error('Missing_Token')
    }

    // Verify (Memastikan token valid)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: "Invalid token" })
        }

        req.userId = decoded.userId // Authentication
        // console.log(decoded.role)
        if (!roleAccess(decoded.role, req.baseUrl)) {
            return res.status(403).json({ message: "Unauthorized access" })
        }

        next()
    })
}

export default authJwt