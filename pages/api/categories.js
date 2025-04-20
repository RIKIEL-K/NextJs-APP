import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get("http://localhost:8000/api/category/");
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Erreur proxy:", error);
    res.status(500).json({ message: "Erreur côté serveur" });
  }
}
