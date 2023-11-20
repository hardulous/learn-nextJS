import Footer from '@/components/Footer'
import React from 'react'

const About = () => {
  return (
    <div>About</div>
  )
}

export default About

// Here this page prop is About component itself that is JSX returned by About component and now About component have its own layout different from one defined in _app.js
About.getLayout = function PageComponent(page){
   return (
    <>
     {page}
     <Footer/> 
    </>
   )
}