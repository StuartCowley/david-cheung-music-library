// tests/album-create.test.js
const { expect } = require('chai');

const request = require('supertest');

const db = require('../src/db');

const app = require('../src/app');

const { json } = require('express');

describe('create album', () => {
  let artistid;
  beforeEach(async () => {
    const { status, body } = await request(app)
      .post('/artists')
      .send({ name: 'Tame Impala', genre: 'rock' });

    expect(status).to.equal(201);
    expect(body.name).to.equal('Tame Impala');
    expect(body.genre).to.equal('rock');
    artistid = body.id;
  });

  describe('/albums', () => {
    describe('POST', () => {
      it('creates a new album in the database', async () => {
        const { status, body } = await request(app)
          .post(`/artists/${artistid}/albums`)
          .send({ name: 'Tame Impala Album', year: 1997 });

        expect(status).to.equal(201);
        expect(body.name).to.equal('Tame Impala Album');
        expect(body.year).to.equal(1997);

        const {
          rows: [albumData],
        } = await db.query(`SELECT * FROM album WHERE id = ${body.id}`);
        expect(albumData.name).to.equal('Tame Impala Album');
        expect(albumData.year).to.equal(1997);
      });
    });
  });
});
