import React from 'react';
import MainHome from './MainHome'
import Services from './Services'
import Contact from './Contact'
import Footer from './Footer';
import Products from './Products';

const Home = () => {
  return (
    <div>
      <MainHome />
      <Products showAddButton= {false} />
      <Services />
      <Contact />
      <Footer />
      
    </div>
  )
}

export default Home