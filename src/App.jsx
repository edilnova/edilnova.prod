import BackToTop from "./components/BackToTop";
import React, { useState } from "react";
import {
  Header,
  Hero,
  Services,
  Contact,
  Footer,
} from "./components/Institutional";
import Portfolio from "./components/Portfolio";
import RepairConsultation from "./components/RepairConsultation";
import Repairs from "./components/Repairs";
export default function App() {
  const [category, setCategory] = useState("Todos");
  const [workType, setWorkType] = useState("all");
  function selectCategory(value) {
    setCategory(value);
    setWorkType("all");
  }
  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <Services onSelect={selectCategory} />
        <Repairs onViewRepairs={() => { setCategory("Todos"); setWorkType("repair"); }} />
        <RepairConsultation />
        <Portfolio
          key={category}
          category={category}
          onCategoryChange={selectCategory}
          type={workType}
          onTypeChange={setWorkType}
        />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
