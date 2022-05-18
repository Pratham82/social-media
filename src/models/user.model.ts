import mongoose from "mongoose";
import { schemaOptions } from "utils/mongooseOptions";
import isEmail from "validator/lib/isEmail";
import isURL from "validator/lib/isURL";
import isStrongPassword from "validator/lib/isStrongPassword";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      immutable: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      immutable: true,
      validate: [isEmail, "Invalid email"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      validate: [
        isStrongPassword,
        "Password must be at least 8 characters long, contain at least one number, one uppercase letter and one lowercase letter",
      ],
    },
    firstName: {
      type: String,
      trim: true,
      required: [true, "First name is required"],
    },

    lastName: {
      type: String,
      trim: true,
      required: [true, "Last name is required"],
    },

    bio: { type: String, trim: true },

    url: { type: String, validate: [isURL, "Invalid URL"], trim: true },

    location: { type: String, validate: [isURL, "Invalid URL"], trim: true },

    profile_image_url: {
      type: String,
      validate: [isURL, "Invalid URL"],
      trim: true,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },

    cover_image_url: {
      type: String,
      validate: [isURL, "Invalid URL"],
      trim: true,
    },

    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },

  schemaOptions,
);

// virtual field for full name
UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const dataSet = mongoose.models.User || mongoose.model("User", UserSchema);
export default dataSet;
