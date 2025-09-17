import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import aiRouter from './routes/aiRoutes.js';
import userRouter from "./routes/userRoutes.js"; 
import { clerkMiddleware,requireAuth } from '@clerk/express'

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())


app.get('/',(req,res)=>{
    res.send(`server is running `)

});

app.use("/api/ai", requireAuth(), aiRouter);
app.use("/api/user", requireAuth(), userRouter);

// app.use(requireAuth())

app.use('/api/ai',requireAuth(),aiRouter)
const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is listning at PORT ${PORT}`)
})

