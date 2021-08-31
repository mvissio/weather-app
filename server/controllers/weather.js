const fetch = require("cross-fetch");
const { response } = require("express");
const BASE_URL = process.env.BASE_URL;

const getLocation = async (req, res = response) => {
  const { keyword } = req.params;

  try {
    const resp = await fetch(`${BASE_URL}search/?query=${keyword}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status >= 400) {
      throw new Error("Bad response from server");
    }

    res.json(await resp.json());
  } catch (err) {
    console.error(err);
  }
};

const getLocationDay = async (req, res = response) => {
  const { woeid, year, month, day } = req.params;

  try {
    const resp = await fetch(`${BASE_URL}${woeid}/${year}/${month}/${day}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status >= 400) {
      throw new Error("Bad response from server");
    }

    res.json(await resp.json());
  } catch (err) {
    console.error(err);
  }
};

const getLocationData = async (req, res = response) => {
  const { woeid } = req.params;
  console.log(`${BASE_URL}${woeid}`);
  try {
    const resp = await fetch(`${BASE_URL}${woeid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (resp.status >= 400) {
      throw new Error("Bad response from server");
    }

    res.json(await resp.json());
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getLocation,
  getLocationDay,
  getLocationData,
};
