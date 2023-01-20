// tests/album-delete.test.js
const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Delete album', () => {
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

  describe('DELETE /albums/{id}', () => {
    it('deletes the album and returns the deleted data', async () => {
      const { status, body } = await request(app)
        .delete(`/albums/${album.id}`)
        .send();

      expect(status).to.equal(200);
      expect(body).to.deep.equal({
        id: album.id,
        name: album.name,
        year: album.year,
        artistid: album.artistid,
      });
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app)
        .delete('/albums/999999999')
        .send();

      expect(status).to.equal(404);
      expect(body.message).to.equal('album 999999999 does not exist');
    });
  });
});
