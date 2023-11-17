import React from 'react'

const NewsList = ({newsList}) => {
  return (
    <div>
      <h1>NewsList</h1>
      {
        newsList.news.map((item,i)=>{
            return <span key={item.id}>{i} - {item.headline}</span>
        })
      }
    </div>
  )
}

export default NewsList

// Similar to getStaticProps the getServerSideProps is used to fetch data from external source and pass it down as a prop to the component but page will be generated not in build time rather on every request made to the page. The getServerSideProps will be executed for every request made to the page. 
export async function getServerSideProps(){

  const response = await fetch("https://fakenews.squirro.com/news/sport")
  const data = await response.json()  
  return {
    props:{
        newsList: data
    }
  }

  // Here what is happening above is that when we navigate to "/news" the nextJS server receive the request and when it receive it , It will run the getServerSideProps() to fetch the data from backend and pass it down as a props to the component , The HTML for the page is generated on the server and then passed to the browser so SEO friendly.   

}

// Let say we have app in which we are displaying news since news is changing constantly so we will use SSR to pre-render the page.

// @@@@@@@@@@ NOTE:: The SSR form of pre-rendering is slow as compared to Static Generation because the server must compute the result first before sending the HTML page and because of this use SSR only when necessary. 

/* 
    getServerSideProps :: 

1. It runs only on the server side just like getStaticProps and have same feature of getStaticProps like we can write server code of nodeJS directly inside it , the code we write inside it will not be included in js bundle , It can be used only in page and cannot be run in regular component 

2. It is used only for pre-rendering from server side but not for client side data fetching 

3. It run on every request made for the page unlike getStaticProps runs for every page at build time 

*/