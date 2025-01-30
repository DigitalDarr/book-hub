import React from 'react';
import "./About.css";
import aboutImg from "../../images/about-img.jpg";
import Navbar from '../../components/NavBar/NavBar';



const About = () => {
  return ( 
    
    <>
    {/* Navbar remains on the About page */}
    <Navbar />

    <section className='about'>
      <div className='container'>
        <div className='about-content grid'>
          <div className='about-img'>
            <img src = {aboutImg} alt = "About BookHub" />
          
       
              </div>
            <div className='about-text'>
          <h2 className='about-title fs-26 ls-1'>About BookHub</h2>
        <p className='fs-17'>BookHub is designed to provide you with easy access to a vast and diverse collection of books, tailored to enhance your book discovery experience. Powered by the Open Library API, our platform offers a variety of features to help you uncover, explore, and enjoy books like never before. </p>
        <p className='fs-17'>With our advanced search functionality, you can easily find specific titles, authors, or subjects, making it simple to track down a beloved classic or discover fresh reads. Dive into a wide range of genres, including Fantasy, Science Fiction, Mystery, Romance, Manga, and many more. Whether you’re revisiting a favorite or seeking something new, each genre is thoughtfully curated to guide your literary journey. </p>
        <p className='fs-17'>Our platform also showcases vibrant book covers, not only making browsing easier but also visually engaging, enhancing the overall experience. BookHub ensures that your book discovery process is smooth, enjoyable, and full of possibilities, all at the touch of a button. </p>
          </div>

        </div>
      </div>
    </section>

    </>

  )
}

export default About;