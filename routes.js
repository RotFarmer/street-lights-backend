"use strict";
const express = require("express");
const routes = express.Router();
const pool = require("./connection");

routes.get("/places", (req, res) => {
  let query = `SELECT * FROM pride`;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});

routes.post("/places", (req, res) => {
  let query = `INSERT INTO pride (name, address, phonenumber, lat, long, safe, info)
  VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  pool
    .query(query, [
      req.body.name,
      req.body.address,
      req.body.phonenumber,
      req.body.lat,
      req.body.long,
      req.body.safe,
      req.body.info,
    ])
    .then((response) => {
      res.status(201);
      res.json(req.body);
    });
});

module.exports = routes;
