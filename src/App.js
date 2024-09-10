import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import './assets/scss/main.css';
import RootRoute from "./router/RootRoute";
import '../node_modules/react-image-crop/dist/ReactCrop.css'
import { Toaster } from 'react-hot-toast';
import { onMessageListener } from "./firebase";
import { getSeoBySlugApi } from "./services/websiteData.service";
import { generateImageUrl } from "./services/url.service";
import { Helmet } from "react-helmet";

export let AuthoriseContext = createContext();
export let LoggedInUserContext = createContext();

export const axiosApiInstance = axios.create();

function App() {
  // onMessageListener()
  //   .then((payload) => {
  //     new Notification(payload?.data?.title, { body: payload?.data?.content });
  //   })
  //   .catch((err) => console.log('failed: ', err));
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [seoObj, setSeoObj] = useState(null);

  const getSeoByUrl = async (url) => {

    try {
      let{data:res} = await getSeoBySlugApi(url);
      if(res.data){
        setSeoObj(res.data)
      }
    } catch (error) {
        console.error(error)      
    }

  }
  
  useEffect(() => {
  let currenctUrl = window.location.href;
  getSeoByUrl(currenctUrl)
  }, [])
  
  return (
    <AuthoriseContext.Provider value={[isAuthorized, setIsAuthorized]}>
      <LoggedInUserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Toaster />
        {
          seoObj && seoObj?._id ?(
            <Helmet>
            <title>{seoObj.title}</title>
            <meta
              name="description"
              content={`${seoObj.description}`}
            />
            <link rel="canonical" href={`${window.location.href}`} />
             <meta
              name="keywords"
              content={`${seoObj.keywords}`}
            />{
              seoObj.imageUrl && (
              <meta property="og:image" content={`${generateImageUrl(seoObj.imageUrl)}`} />
              )
            }
            <meta property="og:title"    content={`${seoObj.title}`} />
            <meta property="og:site_name" content="Plywood Bazar"/>
            <meta property="og:url" content={`${window.location.href}`}/>
            <meta property="og:description"   content={`${seoObj.description}`} />
            <meta property="og:type" content="website"/>
           </Helmet>
          ) : (
            <Helmet>
              <title>Connecting Plywood People - Plywood Bazar.com</title>
               <link rel="canonical" href={`${window.location.href}`} />
               
            </Helmet> 
          )
}
        <BrowserRouter>
          <RootRoute />
        </BrowserRouter>
      </LoggedInUserContext.Provider>
    </AuthoriseContext.Provider>
  );
}

export default App;
