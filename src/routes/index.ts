import express from "express";
import userRoutes from "./user.routes";

import fileupload from "express-fileupload";
import { authRoutes } from "./auth";
import skillRoutes from "./skill.routes";

const routes = express();

routes.use(fileupload({
    useTempFiles : true
}))

routes.use('/user',userRoutes);
routes.use('/auth', authRoutes);
routes.use('/skill', skillRoutes);



export default routes;