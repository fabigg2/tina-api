import express from "express";
import userRoutes from "./user.routes";

import fileupload from "express-fileupload";
import { authRoutes } from "./auth";

const routes = express();

routes.use(fileupload({
    useTempFiles : true
}))

routes.use('/user',userRoutes);
routes.use('/auth', authRoutes);



export default routes;