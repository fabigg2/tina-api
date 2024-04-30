import { uploadImage, deleteImage } from "../utils/image-claudinary";
import { succesfulResponse, unSuccesfulResponse } from "../utils/response";
import SkillModel from "../models/skill.model";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

const skillController = {
  findAll: async (req: Request, res: Response) => {
    try {
      const tech = await SkillModel.find({ state: true });
      succesfulResponse(res, tech);
    } catch (error) {
      unSuccesfulResponse(res);
    }
  },
  findOneById: async (req: Request, res: Response) => {
    const { tid } = req.params;
    try {
      const tech = await SkillModel.findById(tid);
      succesfulResponse(res, tech);
    } catch (error) {
      unSuccesfulResponse(res);
    }
  },
  create: async (req: Request, res: Response) => {
    const { body } = req;
    try {
      const newSkill = new SkillModel(body);
      const tech = await newSkill.save();
      succesfulResponse(res, tech);
    } catch (error) {
      console.log(error);
      unSuccesfulResponse(res);
    }
  },
  edit: async (req: Request, res: Response) => {
    const { tid } = req.params;
    const { body } = req;
    console.log(body);
    try {
      const skill = await SkillModel.findOneAndUpdate({ _id: tid }, body, {
        new: true,
      });
      succesfulResponse(res, skill);
    } catch (error) {
      console.log(error);
      unSuccesfulResponse(res);
    }
  },
  delete: async (req: Request, res: Response) => {
    const { tid } = req.params;
    try {
      const skillFoud = await SkillModel.findById(tid);
      skillFoud.state = false;
      const skill = await skillFoud.save();
      succesfulResponse(res, skill);
    } catch (error) {
      unSuccesfulResponse(res);
    }
  },
  restore: async (req: Request, res: Response) => {
    const { tid } = req.params;
    try {
      const skillFoud = await SkillModel.findById(tid);
      skillFoud.state = true;
      const skill = await skillFoud.save();
      succesfulResponse(res, skill);
    } catch (error) {
      unSuccesfulResponse(res);
    }
  },
  editImage: async (req: Request, res: Response) => {
    const { tid } = req.params;
    const img = <UploadedFile>req.files?.img;
    const tempPath = img.tempFilePath;
    try {
      const imgName = await uploadImage(tempPath);
      const skill = await SkillModel.findById(tid);
      if (skill.img) {
        deleteImage(skill.img);
      }
      skill.img = imgName;
      await skill.save();
      succesfulResponse(res, skill);
    } catch (error) {
      unSuccesfulResponse(res);
    }
  },
};

export default skillController;
