import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ContentHeader from '../../components/ContentHeader';
import Table from '../../components/Table';
import { fetchNhomDonVi, deleteNhomDonVi } from '../../service/apiNhomDonVi/ApiNhomDonVi'; // Import the API functions

const List = () => {
  const [data, setData] = useState([]);

  const breadcrumbs = [
    { label: 'Trang Chủ', url: '/' },
    { label: 'Nhóm Đơn Vị', url: '' },
  ];

  const headers = ["#", "Tên Nhóm", "Ghi Chú", "Hành Động"];

  useEffect(() => {
    const getData = async () => {
      try {
        const nhomDonViData = await fetchNhomDonVi();
        setData(nhomDonViData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } 
    };

    getData();
  }, []); // The empty array ensures this effect runs only once after the component mounts

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa nhóm đơn vị này không?');
    if (confirmDelete) {
      try {
        await deleteNhomDonVi(id);
        setData(data.filter(item => item.id !== id)); // Update the state to remove the deleted item
        alert('Đã xóa nhóm đơn vị thành công!');
      } catch (error) {
        console.error('Failed to delete:', error);
        alert('Có lỗi xảy ra khi xóa nhóm đơn vị. Vui lòng thử lại.');
      }
    }
  };

  const renderRow = (item) => (
    <>
      <td>{item.id}</td>
      <td>{item.TenNhom}</td>
      <td>{item.GhiChu}</td>
      <td>
        <Link to={`/NhomDonVi/thongtin/${item.id}`} className="btn btn-primary" style={{ color: 'white', marginRight: '5px' }}>
          <i className="fas fa-edit" />
          <span> XEM</span>
        </Link>
        <button 
          onClick={() => handleDelete(item.id)} 
          className="btn btn-danger" 
          style={{ color: 'white' }}
        >
          <i className="fa-solid fa-trash"></i>
          <span> XÓA</span>
        </button>
      </td>
    </>
  );

  return (
    <div className="content-wrapper" style={{ minHeight: '1203.31px' }}>
      <ContentHeader title="Nhóm Đơn Vị" breadcrumbs={breadcrumbs} />
      <Table
        headers={headers}
        renderRow={renderRow}
        data={data}
        addPath="/NhomDonVi/them/"
        addText="Thêm Nhóm Đơn Vị"
      />
    </div>
  );
};

export default List;
