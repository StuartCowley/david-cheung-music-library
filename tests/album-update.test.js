// test/album-update.test.js
const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Update album', () => {
  let album;
  beforeEach(async () => {
    let responses;
    responses = await Promise.all([
      db.query(
        'INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *',
        ['Tame Impala', 'rock']
      ),
    ]);
    artists = responses.map(({ rows }) => rows[0]);
    const artistid = artists[0].id;

    responses = await Promise.all([
      db.query(
        'INSERT INTO album (name, year, artistid) VALUES( $1, $2,$3) RETURNING *',
        ['first album', 1990, artistid]
      ),
      db.query(
        'INSERT INTO album (name, year, artistid) VALUES( $1, $2,$3) RETURNING *',
        ['second album', 1995, artistid]
      ),
      db.query(
        'INSERT INTO album (name, year, artistid) VALUES( $1, $2,$3) RETURNING *',
        ['third album', 2000, artistid]
      ),
      db.query(
        'INSERT INTO album (name, year, artistid) VALUES( $1, $2,$3) RETURNING *',
        ['fourth album', 2005, artistid]
      ),
    ]);
    albums = responses.map(({ rows }) => rows[0]);
    album = albums[0];
  });

  describe('PUT /albums/{id}', () => {
    it('replaces the album and returns the updated record', async () => {
      const { status, body } = await request(app)
        .put(`/albums/${album.id}`)
        .send({ name: 'something different', year: 1991 });
      expect(status).to.equal(200);
      expect(body).to.deep.equal({
        id: album.id,
        name: 'something different',
        year: 1991,
        artistid: album.artistid,
      });
    });
  });
});

describe('Patch album', () => {
  let album;
  beforeEach(async () => {
    let responses;
    responses = await Promise.all([
      db.query(
        'INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *',
        ['Tame Impala', 'rock']
      ),
    ]);
    artists = responses.map(({ rows }) => rows[0]);
    const artistid = artists[0].id;

    responses = await Promise.all([
      db.query(
        'INSERT INTO album (name, year, artistid) VALUES( $1, $2,$3) RETURNING *',
        ['first album', 1990, artistid]
      ),
      db.query(
        'INSERT INTO album (name, year, artistid) VALUES( $1, $2,$3) RETURNING *',
        ['second album', 1995, artistid]
      ),
      db.query(
        'INSERT INTO album (name, year, artistid) VALUES( $1, $2,$3) RETURNING *',
        ['third album', 2000, artistid]
      ),
      db.query(
        'INSERT INTO album (name, year, artistid) VALUES( $1, $2,$3) RETURNING *',
        ['fourth album', 2005, artistid]
      ),
    ]);
    albums = responses.map(({ rows }) => rows[0]);
    album = albums[0];
  });

  describe('PATCH /albums/{id}', () => {
    it('updates the album and returns the updated record', async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${album.id}`)
        .send({ name: 'something different', year: 1990 });
      expect(status).to.equal(200);
      expect(body).to.deep.equal({
        id: album.id,
        name: 'something different',
        year: 1990,
        artistid: album.artistid,
      });
    });
    it('updates any one key of album and returns the updated record', async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${album.id}`)
        .send({ year: 1990, name: 'something different' });
      expect(status).to.equal(200);
      expect(body).to.deep.equal({
        id: album.id,
        name: 'something different',
        year: 1990,
        artistid: album.artistid,
      });
    });
    it('updates any keys of album and returns the updated record', async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${album.id}`)
        .send({ year: 1991, name: 'something different' });
      expect(status).to.equal(200);
      expect(body).to.deep.equal({
        id: album.id,
        name: 'something different',
        year: 1991,
        artistid: album.artistid,
      });
    });
    it('returns a 404 if any key of album does not exist', async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${album.id}`)
        .send({ namexxx: 'something different', year: 1990 });

      expect(status).to.equal(404);
      expect(body.message).to.equal('key namexxx does not exist');
    });
    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app)
        .patch('/albums/999999999')
        .send({ name: 'something different', year: 1990 });

      expect(status).to.equal(404);
      expect(body.message).to.equal('album 999999999 does not exist');
    });
  });
});
