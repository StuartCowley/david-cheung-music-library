const db = require('../db/index.js');

exports.albumController = (req, res) => {
  res.status(201).json({
    name: req.body.name,
    year: req.body.year,
  });
};

exports.createAlbum = async (req, res) => {
  const { id } = req.params;
  const { name, year } = req.body;
  try {
    const {
      rows: [album],
    } = await db.query(
      `INSERT INTO album (name, year,artistid) VALUES ($1,$2,$3) RETURNING *`,
      [name, year, id]
    );
    res.status(201).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.readAlbum = async (req, res) => {
  try {
    const { rows } = await db.query('select * from album');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.readSingleAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rows: [album],
    } = await db.query('SELECT * FROM album WHERE id = $1', [id]);
    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { name, year } = req.body;
  try {
    const {
      rows: [album],
    } = await db.query(
      `update album set name = $2, year= $3 WHERE id = $1 returning *`,
      [id, name, year]
    );
    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.patchAlbum = async (req, res) => {
  const { id } = req.params;
  const { name, year } = req.body;
  try {
    const {
      rows: [album],
    } = await db.query('SELECT * FROM album WHERE id = $1', [id]);
    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    let updateStatement = '';
    for (const key in req.body) {
      if (album[key] === undefined) {
        return res.status(404).json({ message: `key ${key} does not exist` });
      }
      if (req.body[key] !== album[key]) {
        if (updateStatement !== '') {
          updateStatement += ', ';
        }
        updateStatement = updateStatement + `${key} = '${req.body[key]}'`;
      }
    }
    const {
      rows: [album1],
    } = await db.query(
      `update album set ${updateStatement} WHERE id = ${id} returning *`
    );
    if (!album1) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }
    return res.status(200).json(album1);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deleteAlbum = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      rows: [album],
    } = await db.query(`delete from album where id = $1 RETURNING *`, [id]);
    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
