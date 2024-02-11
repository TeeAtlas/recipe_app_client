import "./App.css";
import { useState, useEffect } from "react";
import NavBar from "./views/Navbar";
import Homepage from "./views/Homepage";
import { Routes, Route } from "react-router-dom";
import RecipeCard from "./views/RecipeCard";
import Footer from "./views/Footer";
import Gallery from "./views/Gallery";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [galleryInfo, setGalleryInfo] = useState([]);

  useEffect(() => {
    getRecipes();
    // getGalleryInfo();
  }, []);

  async function getRecipes() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/recipes");
      const recipesData = await response.json();
      setRecipes(recipesData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // async function getGalleryInfo() {
  //   try {
  //     setLoading(true);
  //     const response = await fetch("http://localhost:8000/recipes");
  //     const galleryData = await response.json();
  //     setGalleryInfo(galleryData);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <>
      <div className="container">
        <NavBar recipes={recipes} />
        <Routes>
          <Route
            path="/"
            element={<Homepage recipes={recipes} loading={loading} />}
          />
          <Route path="/:id" element={<RecipeCard />} />
          <Route
            path="/gallery"
            element={<Gallery loading={loading} />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
