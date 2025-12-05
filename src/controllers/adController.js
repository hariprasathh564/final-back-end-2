import Ad from "../models/Ad.js";

// GET all ads
export const getAds = async (req, res) => {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch ads" });
  }
};

// GET single ad by ID
export const getAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    res.json(ad);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch ad" });
  }
};

// POST new ad
export const createAd = async (req, res) => {
  try {
    const ad = new Ad(req.body);
    const savedAd = await ad.save();
    res.status(201).json(savedAd);
  } catch (err) {
    res.status(500).json({ message: "Failed to create ad" });
  }
};

// PUT update ad by ID
export const updateAd = async (req, res) => {
  try {
    const updatedAd = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAd) return res.status(404).json({ message: "Ad not found" });
    res.json(updatedAd);
  } catch (err) {
    res.status(500).json({ message: "Failed to update ad" });
  }
};

// DELETE ad by ID
export const deleteAd = async (req, res) => {
  try {
    const deletedAd = await Ad.findByIdAndDelete(req.params.id);
    if (!deletedAd) return res.status(404).json({ message: "Ad not found" });
    res.json({ message: "Ad deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete ad" });
  }
};
