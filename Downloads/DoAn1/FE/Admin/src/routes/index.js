import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NhomDonViRoutes from './NhomDonViRoutes';
import DonViRoutes from './DonViRoutes';
import Loaikhach from '../pages/Khach/Loaikhach';
import TheKhach from '../pages/Khach/Thekhach';
import SiQuan from '../pages/QuanNhan/SiQuan';
import ChienSi from '../pages/QuanNhan/ChienSi';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/NhomDonVi/*" element={<NhomDonViRoutes />} />
      <Route path="/DonVi/*" element={<DonViRoutes />} />
      <Route path="/LoaiKhach" element = {<Loaikhach/>}></Route>
      <Route path="/TheKhach" element = {<TheKhach/>}></Route>
      <Route path="/SiQuan" element = {<SiQuan/>}></Route>
      <Route path="/ChienSi" element = {<ChienSi/>}></Route>
      

    </Routes>
  );
};

export default AppRoutes;
