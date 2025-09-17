import React from "react";
import Navbar from "../components/Navbar.tsx";
import Hero from "../components/Hero.tsx";
import AiTools from "../components/AiTools.tsx";
import Testimonials from "../components/Testimonials.tsx";
import Plan from "../components/Plan.tsx";
import Footer from "../components/Footer.tsx";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <AiTools />
      <Testimonials />
      <Plan />
      
      <Footer />
    </div>
  );
};

export default Home;
