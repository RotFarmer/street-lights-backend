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

module.exports = routes;
