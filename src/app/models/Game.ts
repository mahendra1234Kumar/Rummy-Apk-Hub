import mongoose, { Schema, models } from "mongoose";

const GameSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    longReview: { type: String, default: "" },
    image: { type: String, default: "/placeholder-game.jpg" },
    downloadUrl: { type: String, default: "#" },
    rating: { type: Number, default: 3 },
    bonus: { type: String, default: "" },
    downloads: { type: String, default: "" },
    minWithdrawal: { type: String, default: "" },
    latestVersion: { type: String, default: "" },
    appSize: { type: String, default: "" },
    lastUpdated: { type: String, default: "" },
    withdrawalTime: { type: String, default: "" },
    howToDownload: { type: String, default: "" },
    howToRegister: { type: String, default: "" },
    withdrawalProcess: { type: String, default: "" },
    safetyNote: { type: String, default: "" },
    features: { type: [String], default: [] },
    pros: { type: [String], default: [] },
    cons: { type: [String], default: [] },
    paymentMethods: { type: [String], default: [] },
    faq: {
      type: [
        {
          question: { type: String, default: "" },
          answer: { type: String, default: "" },
        },
      ],
      default: [],
    },
    isHot: { type: Boolean, default: false },
    category: { type: String, default: "General" },
  },
  { timestamps: true }
);

export const Game = models.Game || mongoose.model("Game", GameSchema);
