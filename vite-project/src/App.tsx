
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import WriteArticle from './pages/WriteArticle.tsx';
import ReviewResume from './pages/ReviewResume.tsx';  
import Layout from './pages/Layout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import GenerateImages from './pages/GenerateImages.tsx';  
import BlogTitles from './pages/BlogTitles.tsx';
import RemoveBackGround from './pages/RemoveBackGround.tsx'; 
import RemoveObject from './pages/RemoveObject.tsx';
import Community from './pages/Community.tsx';
import { Toaster } from 'react-hot-toast';

const App : React.FC =  () =>{

  return(
    <div>
      <Toaster/>
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/ai" element={<Layout />} >
    <Route index element={<Dashboard />} />
    <Route path="write-article" element={<WriteArticle />} />
    <Route path="blog-title" element={<BlogTitles />} />
    <Route path="generate-images" element={<GenerateImages />} />
    <Route path="remove-background" element={<RemoveBackGround />} />
    <Route path="remove-object" element={<RemoveObject />} />
    <Route path="review-resume" element={<ReviewResume />} />
    <Route path="community" element={<Community />} />
  </Route>
</Routes>

    </div>
  )
};

export default App;



