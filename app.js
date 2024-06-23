import express, { urlencoded } from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"
import loggingMiddleware from "./middlewares/loggingMiddleware.js"
import errorHandler from "./middlewares/errorHandler.js"
import userRoute from "./routes/user.route.js"
import bodyParser from "body-parser"

const app = express()
dotenv.config()

// Middleware
app.use(bodyParser.json());
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Replace with the URL of your deployed Flask API
const FLASK_API_URL = 'https://140b-114-79-49-141.ngrok-free.app/predict';

// Handle prediction request
app.post('/predict', (req, res) => {
    const formData = req.body;

    // Send the form data to the Flask API
    axios.post(FLASK_API_URL, formData)
        .then(response => {
            // Send the prediction result back to the React app
            res.json({ prediction: response.data.prediction });
        })
        .catch(error => {
            console.error('There was an error making the prediction request!', error);
            res.status(500).send('Error occurred while making the prediction request.');
        });
});

app.use(loggingMiddleware)
app.get('/', (req, res) => res.json({ msg: "Selamat Datang di Ai Cardia: Prediksi Penyakit Jantung" }))
app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use(errorHandler)

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})