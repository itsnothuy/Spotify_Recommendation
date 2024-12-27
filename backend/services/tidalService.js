const axios = require("axios");
require("dotenv").config();

const { TIDAL_CLIENT_ID, TIDAL_CLIENT_SECRET } = process.env;

async function getTidalAccessToken() {
    try {
      const resp = await axios.post(
        "https://auth.tidal.com/v1/oauth2/token",
        new URLSearchParams({ grant_type: "client_credentials" }),
        {
          headers: {
            Authorization:
              "Basic " +
              Buffer.from(`${TIDAL_CLIENT_ID}:${TIDAL_CLIENT_SECRET}`).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return resp.data.access_token;
    } catch (error) {
      console.error("Tidal token error:", error.response?.data || error.message);
      throw new Error("Failed to obtain Tidal access token");
    }
}

async function getAlbumDetails(albumId) {
    const accessToken = await getTidalAccessToken();
    const url = `https://openapi.tidal.com/v2/albums/${albumId}`;
  
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { countryCode: "US" },
      });
      return response.data;
    } catch (error) {
      console.error("Tidal album error:", error.response?.data || error.message);
      throw new Error("Failed to fetch album details");
    }
}
async function getSimilarTracks(trackId) {
    const accessToken = await getTidalAccessToken();
    const url = `https://openapi.tidal.com/v2/tracks/${trackId}/relationships/similarTracks`;
  
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { countryCode: "US", include: "similarTracks" },
      });
      return response.data;
    } catch (error) {
      console.error("Tidal similar tracks error:", error.response?.data || error.message);
      throw new Error("Failed to fetch similar tracks");
    }
  }
  
  module.exports = {
    getTidalAccessToken,
    getAlbumDetails,
    getSimilarTracks,
  };
