//Directly inspired by Carlos's lecture number 15 and repository  idg2100-ntnu-movies-front-end

import axios from "./axios";

const createBrew = (brewName, coffeeName, grind, water, gram, User) =>
  axios.post("/api/brew", 
    brewName,
    coffeeName,
    grind,
    water,
    gram,
    User,
    );

const getBrews = () => {
  return axios.get("/api/brew/latest");
};

const getAllBrews = () => {
  return axios.get("/api/brew");
};

const createBean = (name, brand, roastProfile, price, country, beanType, metersAboveSeaLevel, aroma) =>
  axios.post("/api/bean", {
    name: name,
    brand: brand,
    roastProfile: roastProfile,
    price: price,
    country: country,
    beanType: beanType, 
    metersAboveSeaLevel: metersAboveSeaLevel,
    aroma: aroma,
  });

const getBeans = () => {
  return axios.get("/api/bean");
};

const getBean = (beanId) => {
  return axios.get(`/api/bean/${beanId}`);
};


const checkRating = async (userId, brewId) => {
  return axios.get(`/api/rate/rated/${userId}/${brewId}`);
};

const postRating = (
  brewId,
  userId,
  rating,
  brewName,
  grind,
  water,
  gram,
  createdAt,
) => {
      axios.post("/api/rate", {
        brewId: brewId,
        userId: userId,
        rating: rating,
        brewName: brewName,
        grind: grind,
        water: water,
        gram: gram,
        createdAt: createdAt,
      });
};

const updateRating = (userId, brewId, rating) => {
  axios.put(`/api/rate/${userId}/${brewId}`, { rating: rating });
};

const fetchRatings = (brewId) => {
  return axios.get(`/api/rate/average/${brewId}`);
};

const fetchYourRatings = (userId) => {
  return axios.get(`/api/rate/yourratings/${userId}`);
};

const createUser = (username, email, password) => {
  return axios.post("/api/user", {
    username: username,
    email: email,
    password: password,
  });
};

const getUsers = () => {
  return axios.get("/api/user");
};

const getUser = (userId) => {
  return axios.get(`/api/user/${userId}`);
};

const updateUser = (userId, username, email, role) => {
  axios.patch(`/api/user/${userId}`, {
    username: username,
    email: email,
    role: role,
  });
};

const deleteUser = (userId) => {
  axios.delete(`/api/user/${userId}`);
};

const registerUser = (username, email, password) => {
  return axios.post("/api/auth/register", {
    username: username,
    email: email,
    password: password,
  });
};

const login = (username, password) => {
  return axios.post("/api/auth/login", { username, password });
};

export {
  createBrew,
  getBrews,
  getAllBrews,
  createBean,
  getBeans,
  getBean,
  checkRating,
  postRating,
  updateRating,
  fetchRatings,
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  fetchYourRatings,
  registerUser,
  login,
};
