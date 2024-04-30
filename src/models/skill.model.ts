import {model, Schema} from "mongoose";

const techScehema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    color: {
        type: String
    },
    state: {
        type: Boolean,
        required: true,
        default: true
    }
    
});

const SkillModel = model('skill', techScehema);
export default SkillModel;