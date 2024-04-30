import { Router } from "express";
import { check } from "express-validator";
import { expressValidatorErrors, loadImage } from "../middlewares/globals";
import skillController from "../controllers/skill.controller";

const skillRoutes = Router();

skillRoutes.get("/all", skillController.findAll);
skillRoutes.get("/:tid", skillController.findOneById);
skillRoutes.post(
  "/",
  [
    check("name", "name is required").notEmpty().isString(),
    check("color", "color is required").notEmpty().isString(),
    // check('img', 'img is required').notEmpty().isString(),
    loadImage,
    expressValidatorErrors,
  ],
  skillController.create
);
skillRoutes.put("/:tid", [loadImage], skillController.edit);
skillRoutes.delete("/:tid", skillController.delete);
skillRoutes.put("/restore/:tid", skillController.restore);
skillRoutes.put("/img/:tid", skillController.editImage);

export default skillRoutes;
