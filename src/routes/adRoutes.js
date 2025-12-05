// import express from "express";
// import {
//   getAds,
//   getAd,
//   createAd,
//   updateAd,
//   deleteAd
// } from "../controllers/adController.js";

// const router = express.Router();

// router.get("/", getAds);          // GET all ads
// router.get("/:id", getAd);        // GET single ad
// router.post("/", createAd);       // POST new ad
// router.put("/:id", updateAd);     // UPDATE ad
// router.delete("/:id", deleteAd);  // DELETE ad

// export default router;





import express from "express";
import {
  getAds,
  getAd,
  createAd,
  updateAd,
  deleteAd
} from "../controllers/adController.js";

import upload from "../middlewares/multerConfig.js";

const router = express.Router();

// Upload route (IMPORTANT)
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  res.json({
    message: "Image uploaded successfully",
    image: fileUrl,
  });
});

// CRUD ROUTES
router.get("/", getAds);
router.get("/:id", getAd);
router.post("/", createAd);
router.put("/:id", updateAd);
router.delete("/:id", deleteAd);

export default router;
