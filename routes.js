"use strict";
const express = require("express");
const routes = express.Router();
const pool = require("./connection");

routes.get("/places", (req, res) => {
  let query = `SELECT * FROM places`;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});

routes.post("/places", (req, res) => {
  let query = `INSERT INTO places (name, address, phonenumber, lat, long, safe)
  VALUES ($1, $2, $3, $4, $5, $6)`;
  pool
    .query(query, [
      req.body.name,
      req.body.address,
      req.body.phonenumber,
      req.body.lat,
      req.body.long,
      req.body.safe,
    ])
    .then((response) => {
      res.status(201);
      res.json(req.body);
    });
});

routes.get("/reports", (req, res) => {
  let query = `select * from reports where place_id = ${req.query.id}`;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});

routes.post("/reports", (req, res) => {
  let query = `INSERT INTO reports (place_id, report, date)
  VALUES ($1, $2, $3)`;
  pool
    .query(query, [req.body.place_id, req.body.report, req.body.date])
    .then((response) => {
      res.status(201);
      res.json(req.body);
    });
});

module.exports = routes;
