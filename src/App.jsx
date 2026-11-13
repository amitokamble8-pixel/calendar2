import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Footer, ScrollToTop } from "./layout";
import {
  Home, About, Work, WorkDetail, Projects, Awards,
  Publications, Volunteering, Sports, Contact, NotFound,
} from "./pages";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<WorkDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/awards" element={<Awards />} />
            {/* /publications renders "Areas of Interest" */}
            <Route path="/publications" element={<Publications />} />
            <Route path="/volunteering" element={<Volunteering />} />
            {/* /sports renders "Music & Activities" */}
            <Route path="/sports" element={<Sports />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
