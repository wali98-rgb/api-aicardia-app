import express, { urlencoded } from "express"
import cors from "cors"
import dotenv from "dotenv"

const app = express()
dotenv.config()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.json({ msg: "Selamat Datanag Ai Cardia: Prediksi Penyakit Jantung" }))


const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})