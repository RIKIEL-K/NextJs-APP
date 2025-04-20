import axios from 'axios';

const BASE_URL = "http://localhost:8000/api/category/";

export const getCategory = (id) => axios.get(`${BASE_URL}${id}/`);
export const deleteCategory = (id) => axios.delete(`${BASE_URL}${id}/`);
export const getCategories = () => axios.get("/api/categories"); //appel local enpassant par un proxy
