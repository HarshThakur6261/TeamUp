const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.URL || 'mongodb+srv://thakurharsh345:5yH4oZvOycA6Qr7z@hackathonwebsite.fqup5.mongodb.net/WebsiteUser';
console.log(URL)

mongoose
  .connect(URL)
  .then(() => {
    console.log(URL)
    console.log("User database connected");
    
  })
  .catch((e) => {
    console.log("User database connection error", e);
  });

const userSchema = new mongoose.Schema(
  {
    name: {
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
    },
    profilePicture: {
      type: String,
      default: "",
    },
    college: {
      type: String,
      default: "",
    },
    degree: {
      default: "",
      type: String,
    },
    GraduationYear: {
      type: Number,
      default: "",
    },
    skills: [String],
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    bio: {
      default: "",
      type: String,
      maxlength: 500,
    },
    githubProfile: {
      type: String,
      default: "",
    },
    linkedinProfile: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const hackathonschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    startDate: { type: Date, required: true }, // Flattened date structure
    endDate: { type: Date, required: true },
    status: { type: String, default: "upcoming" },
    location: { type: String, required: true },
    description: { type: String, required: true },
    eligibility: { type: String, required: true },
    teamSize: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    registration: {
      open: { type: Boolean, default: true },
      deadline: { type: Date, required: true },
    },
    prizes: [
      {
        name: { type: String, required: true },
        money: { type: Number, required: true },
      },
    ],
    organizers: [
      {
        name: { type: String, required: true },
      },
    ],
    participants: [{ type: mongoose.Schema.ObjectId, ref: "Team" }],
  },
  { timestamps: true }
);

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Usermodel",
          required: true,
        },
        role: {
          type: String,
          enum: ["leader", "member"],
          default: "member",
        },
      },
    ],
    hackathonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon", // assuming 'Hackathon' is your model name for the Hackathon collection
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

const NotificationSchema = new mongoose.Schema(
  {
    SenderUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    RecieverUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["read", "unread"],
      default: "unread",
      required: true,
    },
    Details: {
      type: Object, // Allows any object
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

const UserModel = mongoose.model("UserModel", userSchema);
const HackathonModel = mongoose.model("Hackathon", hackathonschema);
const TeamModel = mongoose.model("Team", teamSchema);
const NotificationModel = mongoose.model("Notification", NotificationSchema);

module.exports = { UserModel, HackathonModel, TeamModel, NotificationModel };
