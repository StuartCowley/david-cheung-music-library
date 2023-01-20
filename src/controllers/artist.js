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

exports.readArtist = async (req, res) => {
  try {
    // $$$ my solution $$$
    // const {
    //   rows: [artistRecords],
    // } = await db.query(
    //   `select json_agg(json_build_object('id',id,'name',name,'genre',genre)) from artists`
    // );
    // res.status(200).json(artistRecords.json_agg);
    const { rows } = await db.query('select * from artists');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.readSingleArtist = async (req, res) => {
  try {
    // $$$ my solution $$$
    // const { rows } = await db.query(
    //   `select * from artists where id = ${req.params.id}`
    // );
    // if (rows.length > 0) {
    //   res.status(200).json(rows[0]);
    // } else {
    //   res
    //     .status(404)
    //     .json({ message: `artist ${req.params.id} does not exist` });
    // }
    const { id } = req.params;
    const {
      rows: [artist],
    } = await db.query('SELECT * FROM Artists WHERE id = $1', [id]);

    if (!artist) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }

    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.updateArtist = async (req, res) => {
  const { id } = req.params;
  const { name, genre } = req.body;
  try {
    // $$ this is my solution $$
    // const { id } = req.params;
    // const { name, genre } = req.body;
    // const {
    //   rows: [artist],
    // } = await db.query('SELECT * FROM Artists WHERE id = $1', [id]);

    // if (!artist) {
    //   return res.status(404).json({ message: `artist ${id} does not exist` });
    // }
    const {
      rows: [artist1],
    } = await db.query(
      `update artists set name = $2, genre = $3 WHERE id = $1 returning *`,
      [id, name, genre]
    );
    if (!artist1) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }
    // const {
    //   rows: [artist2],
    // } = await db.query('SELECT * FROM Artists WHERE id = $1', [id]);

    // res.status(200).json(artist2);

    res.status(200).json(artist1);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.patchArtist = async (req, res) => {
  const { id } = req.params;
  const { name, genre } = req.body;
  try {
    const {
      rows: [artist],
    } = await db.query('SELECT * FROM Artists WHERE id = $1', [id]);
    if (!artist) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }
    let updateStatement = '';
    for (const key in req.body) {
      if (artist[key] === undefined) {
        return res.status(404).json({ message: `key ${key} does not exist` });
      }
      if (req.body[key] !== artist[key]) {
        if (updateStatement !== '') {
          updateStatement += ', ';
        }
        updateStatement = updateStatement + `${key} = '${req.body[key]}'`;
      }
    }
    const {
      rows: [artist1],
    } = await db.query(
      `update artists set ${updateStatement} WHERE id = ${id} returning *`
    );
    if (!artist1) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }
    return res.status(200).json(artist1);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deleteArtist = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      rows: [artist],
    } = await db.query(`delete from artists where id = $1 RETURNING *`, [id]);
    if (!artist) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }
    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
