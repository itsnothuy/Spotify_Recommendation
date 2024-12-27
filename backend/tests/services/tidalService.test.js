const axios = require("axios");
const { getTidalAccessToken, getAlbumDetails, getSimilarTracks } = require("../../services/tidalService");

jest.mock("axios");

describe("Tidal Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getTidalAccessToken", () => {
    it("should return an access token", async () => {
      axios.post.mockResolvedValue({
        data: { access_token: "test_token" },
      });

      const token = await getTidalAccessToken();
      expect(token).toBe("test_token");
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if token retrieval fails", async () => {
      axios.post.mockRejectedValue(new Error("Invalid client credentials"));
      await expect(getTidalAccessToken()).rejects.toThrow(
        "Failed to obtain Tidal access token"
      );
    });
  });

  describe("getAlbumDetails", () => {
    it("should fetch album details successfully", async () => {
      axios.post.mockResolvedValueOnce({ data: { access_token: "test_token" } });
      axios.get.mockResolvedValueOnce({
        data: { title: "Album Title", artist: "Artist Name" },
      });

      const albumId = "12345";
      const details = await getAlbumDetails(albumId);

      expect(details).toEqual({ title: "Album Title", artist: "Artist Name" });
    });
  });

  describe("getSimilarTracks", () => {
    it("should fetch similar tracks successfully", async () => {
      axios.post.mockResolvedValueOnce({ data: { access_token: "test_token" } });
      axios.get.mockResolvedValueOnce({
        data: { data: [ { id: "198810793", type: "tracks" } ] },
      });

      const trackId = "12345";
      const details = await getSimilarTracks(trackId);

      expect(details).toEqual({ data: [ { id: "198810793", type: "tracks" } ] });
    });
  });
});
