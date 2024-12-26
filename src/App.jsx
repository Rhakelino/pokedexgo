import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"; // Komponen halaman utama
import NotFound from "./Pages/NotFound";
import DetailPokemon from "./Pages/detailPokemon";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Halaman utama */}
        <Route path="*" element={<NotFound />} />
        <Route path="/pokemon/:id" element={<DetailPokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
