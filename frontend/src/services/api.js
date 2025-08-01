import axios from "axios";

const API_BASE = "http://localhost:5000"; // Update if different (e.g., Vercel/Render)

//
// 🏠 Listings
//

export const getUserById = async (id) => {
  const res = await axios.get(`${API_BASE}/users/${id}`);
  return res.data;
};

export const getUserByClerkId = async (clerkId) => {
  return await axios.get(`${API_BASE}/users/by-clerk/${clerkId}`)
    .then(res => res.data);
};


export const fetchAllListings = async () => {
  const res = await axios.get(`${API_BASE}/listings/`);
  return res.data;
};

// export const createListing = async (listingData) => {
//   const res = await axios.post(`${API_BASE}/listings/`, listingData);
//   return res.data;
// };

export const createListing = (data) => {
  return axios.post(`${API_BASE}/listings/`, data);
};

export const promoteUserToHost = async (id, name, email) => {
  const res = await axios.post(`${API_BASE}/users/promote`, { id, name, email });
  return res.data;
};


//
// 📍 Locations
//
// export const fetchAllLocations = async () => {
//   const res = await axios.get(`${API_BASE}/locations/`);
//   return res.data;
// };

export const fetchAllLocations = async () => {
  return await axios.get(`${API_BASE}/locations/`)
    .then(res => res.data);
};

export const createLocation = async (locationData) => {
  const res = await axios.post(`${API_BASE}/locations/`, locationData);
  return res.data;
};

//
// 📸 Listing Images
//
export const fetchImagesForListing = async (listingId) => {
  const res = await axios.get(`${API_BASE}/images/${listingId}`);
  return res.data;
};

export const uploadImageForListing = (formData) => {
  return axios.post(`${API_BASE}/images/`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

//
// 📅 Reservations
//
export const makeReservation = async (reservationData) => {
  const res = await axios.post(`${API_BASE}/reservations/`, reservationData);
  return res.data;
};

export const getReservationsForGuest = async (guestId) => {
  const res = await axios.get(`${API_BASE}/reservations/guest/${guestId}`);
  return res.data;
};

//
// 👤 Users
//
export const registerUser = async (userData) => {
  const res = await axios.post(`${API_BASE}/users/register`, userData);
  return res.data;
};
