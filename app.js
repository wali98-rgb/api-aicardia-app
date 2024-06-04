import express, { urlencoded } from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"
import loggingMiddleware from "./middlewares/loggingMiddleware.js"
import errorHandler from "./middlewares/errorHandler.js"

const app = express()
dotenv.config()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(loggingMiddleware)
app.get('/', (req, res) => res.json({ msg: "Selamat Datang di Ai Cardia: Prediksi Penyakit Jantung" }))
app.use('/auth', authRoute)
app.use(errorHandler)

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})