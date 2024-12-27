// routes/tidalRoute.js
const express = require("express");
const router = express.Router();
const { getAlbumDetails, getSimilarTracks } = require("../services/tidalService");

router.get("/tidal/album", async (req, res) => {
  try {
    const { albumId } = req.query;
    if (!albumId) {
      return res.status(400).json({ error: "Album ID is required" });
    }
    const data = await getAlbumDetails(albumId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/tidal/similar-tracks", async (req, res) => {
  try {
    const { trackId } = req.query;
    if (!trackId) {
      return res.status(400).json({ error: "Track ID is required" });
    }
    const data = await getSimilarTracks(trackId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
