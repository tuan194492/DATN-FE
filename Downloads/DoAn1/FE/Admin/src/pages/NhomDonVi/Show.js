import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ContentHeader from '../../components/ContentHeader';
import Table1 from '../../components/Table1';
import Table2 from '../../components/Table2';

import { fetchNhomDonViById, updateNhomDonVi } from '../../service/apiNhomDonVi/ApiNhomDonVi';
import { fetchCapDonVi, deleteCapDonVi } from '../../service/apiCapDonVi/ApiCapDonVi';
import { fetchDanhSachChucVu } from '../../service/apiChucVu_DonVi/ApiChucVu_DonVi';
import { useNavigate } from 'react-router-dom';

const Show = () => {
  const { id } = useParams();
  
  
  const [nhomDonVi, setNhomDonVi] = useState({ TenNhom: '', GhiChu: '' });
  const [capDonViList, setCapDonViList] = useState([]);
  const [dataChucVuQuanNhan, setDataChucVuQuanNhan] = useState([]);
  const [showChucVu, setShowChucVu] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nhomData = await fetchNhomDonViById(id);
        setNhomDonVi({
          TenNhom: nhomData.TenNhom,
          GhiChu: nhomData.GhiChu
        });

        const capData = await fetchCapDonVi(id);
        setCapDonViList(capData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const navigate = useNavigate();

  const handleAddClick = () => {
    console.log('11111111')

    console.log(id)
    navigate(`/NhomDonVi/${id_CapNhomDonVi}/ChucVuSiQuan/them`, { state: { id_cu: id } });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateNhomDonVi(id, {
        TenNhom: nhomDonVi.TenNhom,
        GhiChu: nhomDonVi.GhiChu,
      });

      if (response.status === 'success') {
        alert(response.message);
        // Có thể điều hướng lại trang danh sách hoặc cập nhật giao diện tại đây nếu cần
      }
    } catch (error) {
      console.error('Failed to update Nhom Don Vi:', error);
      alert('Có lỗi xảy ra khi cập nhật nhóm đơn vị. Vui lòng thử lại.');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa cấp đơn vị này không?');
    if (confirmDelete) {
      try {
        await deleteCapDonVi(id);
        alert('Cấp đơn vị đã được xóa thành công!');
        // Cập nhật danh sách sau khi xóa
        setCapDonViList(capDonViList.filter(item => item.id !== id));
      } catch (error) {
        alert('Có lỗi xảy ra khi xóa cấp đơn vị. Vui lòng thử lại.');
        console.error('Error deleting CapDonVi:', error);
      }
    }
  };
// Khởi tạo state với giá trị ban đầu là null hoặc giá trị bạn muốn
const [id_CapNhomDonVi, setId_CapNhomDonVi] = useState(null);

const fetchChucVu = async (id) => {
  try {
    const chucvu = await fetchDanhSachChucVu(id);
    setDataChucVuQuanNhan(chucvu);
    
    // Cập nhật id_CapNhomDonVi với giá trị id
    setId_CapNhomDonVi(id);
    setShowChucVu(true); // Hiển thị bảng chức vụ sau khi fetch dữ liệu
  } catch (error) {
    console.error('Error fetching Chuc Vu Si Quan:', error);
  }
}; 


  const breadcrumbs = [
    { label: 'Trang Chủ', url: '/' },
    { label: 'Nhóm Đơn Vị', url: '/NhomDonVi' },
    { label: 'Thông Tin', url: '' },
  ];

  const headers = ["#", "Tên", "Cấp Đơn Vị Cấp Trên", "Hành Động"];

  const renderRow = (item, index) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.Ten}</td>
      <td>{item.CapTren__Ten || 'N/A'}</td>
      <td>
        <button
          className="btn btn-primary mr-2"
          style={{ color: 'white' }}
          onClick={() => fetchChucVu(item.id)} // Thay đổi để gọi hàm fetchChucVu với id của CapDonVi
        >
          <i className="fa-solid fa-user"></i>
          <span> CHỨC VỤ</span>
        </button>
        <button
          className="btn btn-danger"
          style={{ color: 'white' }}
          onClick={() => handleDelete(item.id)}
        >
          <i className="fa-solid fa-trash"></i>
          <span> XÓA</span>
        </button>
      </td>
    </tr>
  );

  const headersChucVuQuanNhan = ["#", "Tên Chức Vụ", "Hành Động"];
  const renderRowChucVuQuanNhan = (item, index) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.TenChucVu}</td>
      <td>
        <Link to={`/xoa/${item.id}`} className="btn btn-danger" style={{ color: 'white' }}>
          <i className="fa-solid fa-trash"></i>
          <span> XÓA</span>
        </Link>
      </td>
    </tr>
  );

  return (
    <div className="content-wrapper" style={{ minHeight: '1203.31px' }}>
      <ContentHeader title='Thông Tin' breadcrumbs={breadcrumbs} />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-default">
            <div className="card-body">
              <form method="post" encType="multipart/form-data">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="TenNhom">Tên Nhóm</label>
                      <input
                        type="text"
                        className="form-control"
                        id="TenNhom"
                        name="TenNhom"
                        value={nhomDonVi.TenNhom}
                        onChange={(e) => setNhomDonVi({ ...nhomDonVi, TenNhom: e.target.value })}
                        placeholder='Tên nhóm đơn vị'
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="GhiChu">Ghi Chú</label>
                      <textarea
                        rows={3}
                        className="form-control"
                        id="GhiChu"
                        name="GhiChu"
                        value={nhomDonVi.GhiChu}
                        onChange={(e) => setNhomDonVi({ ...nhomDonVi, GhiChu: e.target.value })}
                        placeholder='Ghi chú'
                        required
                      />
                    </div>
                  </div>
                </div>
                <Link className="btn btn-success mr-2" to="/NhomDonVi">Quay Lại</Link>
                <button className="btn btn-primary" onClick={handleUpdate}>Sửa Nhóm Đơn Vị</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className='container-fluid'>
        <div className="row">
          <section className="content col-md-7">
            <Table1
              headers={headers}
              renderRow={renderRow}
              data={capDonViList}
              addPath={`/NhomDonVi/${id}/CapDonVi/them`}
              addText="Thêm Cấp Đơn Vị"
              search={false}
            />
          </section>

          <section className="content col-md-5">
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="card" style={{ marginBottom: '3px' }}>
                      <ul className="nav nav-tabs">
                        <li className="nav-item">
                          <a
                            className={`nav-link ${activeTab === 1 ? 'active' : ''}`}
                            onClick={() => setActiveTab(1)}
                            href="#!"
                          >
                            Chức Vụ Sĩ Quan
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="tab-content">
                      <div className="card tab-pane active">
                        <div className="card-header">
                          <h3 className="card-title" style={{ lineHeight: '36px' }}>DANH SÁCH CHỨC VỤ</h3>
                        </div>

                        {showChucVu ? (
                          <Table2
                            headers={headersChucVuQuanNhan}
                            renderRow={renderRowChucVuQuanNhan}
                            data={dataChucVuQuanNhan}
                            addPath={`/NhomDonVi/${id_CapNhomDonVi}/ChucVuSiQuan/them`}
                            addText="Thêm Chức Vụ"
                            search={false}
                            onAddClick={handleAddClick}  // Thêm onAddClick
                          />
                        ) : (
                          <div className="card-body">Chưa có dữ liệu.</div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Show;
