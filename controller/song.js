const cloudinary = require("../config/cloudinary");
const songModel = require("../model/song");
const userModel = require("../model/user");

const createSong = async (req, res) => {
  try {
    const { song, name, owner } = req.body;

    if ((!song || !name, !owner)) {
      return res.status(401).json({ error: "Song and song name are required" });
    }

    const songExists = await songModel.findOne({ name: name }).exec();
    if (songExists) {
      return res
        .status(403)
        .json({ error: "Song with that name already exists" });
    }

    const result = await cloudinary.uploader.upload(song, {
      resource_type: "auto",
      folder: "songs",
    });

    const newSong = {
      owner,
      name,
      url: result.url,
      public_id: result.public_id,
    };

    const results = await songModel.create(newSong);

    return res.status(201).json({ song: results });
  } catch (err) {
    console.log(err.message);
  }
};

const getSongs = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res
      .status(401)
      .json({ error: "You need to log in to access songs" });
  }

  try {
    const userExists = await userModel.findOne({ _id: userId }).exec();
    if (!userExists) {
      return res.status(403).json({ error: "User not found" });
    }

    const songs = await songModel.find({ owner: userId });
    if (!songs) {
      return res.json({ songs: [] });
    }

    return res.json({ songs });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ error: "Something went wrong. Try again later" });
  }
};

const updateSong = async (req, res) => {
  const { songId } = req.params;
  if (!songId) {
    return res.status(401).json({ error: "Song id is required" });
  }

  try {
    const song = await songModel.findOne({ _id: songId }).exec();
    if (!song) {
      return res.status(403).json({ error: "Song with that id not found" });
    }

    if (req.body.name) {
      song.name = req.body.name;
    }

    return await song.save();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteSong = async (req, res) => {
  const { songId } = req.params;
  if (!songId) {
    return res.status(401).json({ error: "Song id is required" });
  }

  try {
    const song = await songModel.findOne({ _id: songId }).exec();
    if (!song) {
      return res.status(403).json({ error: "Song with that id not found" });
    }

    await cloudinary.uploader.destroy(song.public_id);
    await songModel.deleteOne({ _id: songId });

    return res.json({ success: "Song successfully deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createSong, getSongs, updateSong, deleteSong };
