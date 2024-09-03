import React from 'react';
import { Route, Routes } from 'react-router-dom';
import List from '../pages/DonVi/List';
import Add from '../pages/DonVi/Add';
import Show from '../pages/DonVi/Show';


const DonViRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="them" element={<Add />} />
      <Route path="thongtin/:id" element={<Show />} />
    </Routes>
  );
};

export default DonViRoutes;