// backend/controllers/chatController.js
import Chat from "../models/Chat.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    // Gemini Request
    const resp = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 80, // short reply
      },
    });

    // Convert response safely
    let botResponse = resp.text || "Sorry, I couldn't understand.";

    // Force 2–3 lines max
    botResponse = botResponse
      .split("\n")
      .slice(0, 3)
      .join(" ")
      .substring(0, 180); // hard cut if needed

    // Save to DB
    const chat = await Chat.create({
      user_id: req.user.id,
      message,
      response: botResponse,
    });

    res.status(201).json(chat);
  } catch (err) {
    console.error("Error in sendMessage:", err);
    res.status(500).json({ message: "Could not send message." });
  }
};

// USER chat history
export const getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({ user_id: req.user.id }).sort({
      createdAt: 1,
    });
    res.json(chats);
  } catch (err) {
    console.error("Error in getChatHistory:", err);
    res.status(500).json({ message: "Could not get chat history." });
  }
};

// ⭐ ADMIN — Get ALL chats from ALL users
export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find()
      .populate("user_id", "name email")
      .sort({ createdAt: -1 });

    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: "Error fetching chats." });
  }
};

// Admin delete a chat by its ID

export const deleteChatAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findById(id);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    await chat.deleteOne(); // safe for Mongoose >= 6
    res.json({ message: "Chat deleted successfully" });
  } catch (err) {
    console.error("Delete Chat Error:", err);
    res.status(500).json({ message: "Could not delete chat", error: err.message });
  }
};