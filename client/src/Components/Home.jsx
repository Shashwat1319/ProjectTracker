
import React from "react";   
import Carousal from "./Carousal";
import Introduction from "./Introduction";
import UseCases from "./UseCases";
import Footer from "./Footer";


const Home = () => {
  return (
    <>
    <section>
        <Introduction/>
    </section>
      <section>
        <Carousal/>
      </section>
      <section>
        <UseCases/>
      </section>
      <footer>
        <Footer/>
      </footer>
 

  </>
  )
}

export default Home