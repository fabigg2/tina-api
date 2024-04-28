import { model, Schema } from "mongoose";
import { encodePassword } from "../utils/encript.password";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    profession: {
      type: String,
    },
    profile: {
      type: String,
    },
    sumary: {
      type: String,
    },
    greeting: {
      type: String,
    },
    rol: {
      type: String,
      default: "OWNER",
    },
    isDisabled: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const password = encodePassword(this.get("password"));
    this.set("password", password);
  }
  next();
});

const userModel = model("user", userSchema);
export default userModel;
