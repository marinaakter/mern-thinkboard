import express from 'express'
import notesRoutes from "./routes/notesRoute.js"
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001


app.use(express.json()) //middleware
app.use("/api/notes", notesRoutes) //routes

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is listening on PORT:", PORT);
  });  
}); 

