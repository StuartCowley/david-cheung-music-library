const db = require('../db/index.js');

exports.artistController = (req, res) => {
  // res.status(201).json(req.query.body);
  res.status(201).json({
    name: req.body.name,
    genre: req.body.genre,
  });
};

exports.createArtist = async (req, res) => {
  const { name, genre } = req.body;
  try {
    const {
      rows: [artist],
    } = await db.query(
      `INSERT INTO artists (name, genre) VALUES ($1,$2) RETURNING *`,
      [name, genre]
      // to prevent SQL injection :
      // `INSERT INTO artists (name, genre) VALUES ('${name}', '${genre}') RETURNING *`
    );
    res.status(201).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
