import React from 'react';
import { Route, Routes } from 'react-router-dom';
import List from '../pages/NhomDonVi/List';
import Add from '../pages/NhomDonVi/Add';
import Show from '../pages/NhomDonVi/Show';
import AddCapDonVi from '../pages/NhomDonVi/AddCapDonVi';
import AddChucVuSiQuan from '../pages/NhomDonVi/AddChucVuSiQuan';
import AddChucVuQuanNhan from '../pages/NhomDonVi/AddChucVuQuanNhan';

const NhomDonViRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="them" element={<Add />} />
      <Route path="thongtin/:id" element={<Show />} />
      <Route path=":id/CapDonVi/them" element={<AddCapDonVi />} />
      <Route path=":id/ChucVuSiQuan/them" element={<AddChucVuSiQuan />} />
      <Route path=":id/ChucVuQuanNhan/them" element={<AddChucVuQuanNhan />} />
    </Routes>
  );
};

export default NhomDonViRoutes;
