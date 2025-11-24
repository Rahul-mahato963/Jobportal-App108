import express, { urlencoded } from "express";
import connectDB from "./db/dbconnection.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./routes/userroutes.js";
import companyRoute from "./routes/companyroutes.js";
import jobRoute from "./routes/jobroutes.js";
import applicationRoute from "./routes/applicationroutes.js";

dotenv.config();

connectDB();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    origin: "https://jobportal-app108production.onrender.com",  // your React deployed URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
