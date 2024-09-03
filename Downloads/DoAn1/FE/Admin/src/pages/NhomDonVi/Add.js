import React, { useState } from 'react';
import ContentHeader from '../../components/ContentHeader';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import { createNhomDonVi } from '../../service/apiNhomDonVi/ApiNhomDonVi'; // Import the API function

const Add = () => {
  const [formData, setFormData] = useState({
    tenNhom: '',
    ghiChu: ''
  });

  const navigate = useNavigate(); // useNavigate instead of useHistory

  const breadcrumbs = [
    { label: 'Trang Chủ', url: '/' },
    { label: 'Nhóm Đơn Vị', url: '/NhomDonVi' },
    { label: 'Thêm Nhóm Đơn Vị', url: '' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNhomDonVi(formData);
      alert('Nhóm đơn vị đã được thêm thành công!');
      navigate('/NhomDonVi'); // Redirect to the list page
    } catch (error) {
      alert('Có lỗi xảy ra khi thêm nhóm đơn vị. Vui lòng thử lại.');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="content-wrapper" style={{ minHeight: '1203.31px' }}>
      <ContentHeader title='Thêm Nhóm Đơn Vị' breadcrumbs={breadcrumbs} />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-default">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="TenNhom">Tên Nhóm</label>
                      <input
                        type="text"
                        className="form-control"
                        id="TenNhom"
                        name="TenNhom"
                        placeholder="Tên nhóm đơn vị"
                        value={formData.TenNhom}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="GhiChu">Ghi Chú</label>
                      <input
                        type="text"
                        className="form-control"
                        id="GhiChu"
                        name="GhiChu"
                        placeholder="Ghi chú"
                        value={formData.GhiChu}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <Link className="btn btn-success mr-2" to="/NhomDonVi">Quay Lại</Link>
                <button type="submit" className="btn btn-primary">Thêm Nhóm Đơn Vị</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Add;
