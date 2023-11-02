const router = require("express").Router();
const songController = require("../controller/song");

router.route("/").post(songController.createSong);

router.route("/all/:userId").get(songController.getSongs);

router
  .route("/:songId")
  .put(songController.updateSong)
  .delete(songController.deleteSong);

module.exports = router;
