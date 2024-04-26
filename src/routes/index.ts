import express from "express";
import userRoutes from "./user.routes";
const routes = express();

routes.use('/user',userRoutes);



export default routes;