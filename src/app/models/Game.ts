import mongoose, { Schema, models } from "mongoose";

const GameSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "/placeholder-game.jpg" },
    downloadUrl: { type: String, default: "#" },
    rating: { type: Number, default: 3 },
    bonus: { type: String, default: "" },
    downloads: { type: String, default: "" },
    minWithdrawal: { type: String, default: "" },
    isHot: { type: Boolean, default: false },
    category: { type: String, default: "General" },
  },
  { timestamps: true }
);

export const Game = models.Game || mongoose.model("Game", GameSchema);
