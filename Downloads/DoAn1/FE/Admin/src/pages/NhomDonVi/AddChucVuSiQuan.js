import React, { useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import ContentHeader from '../../components/ContentHeader';
import { createChucVu } from '../../service/apiChucVu_DonVi/ApiChucVu_DonVi';

const AddChucVuSiQuan = () => {
    const location = useLocation();
    const { id_cu } = location.state || {}; // Nhận id_cu từ state, mặc định là undefined nếu không có state
    const { id } = useParams(); // ID của đối tượng cấp đơn vị
    const navigate = useNavigate();
    const [tenChucVu, setTenChucVu] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                TenChucVu: tenChucVu,
                id_CapNhomDonVi: id, // ID của đối tượng cấp đơn vị
            };

            const response = await createChucVu(data);
            if (response.status === 'success') {
                alert('Thêm Chức Vụ Sĩ Quan thành công');
                navigate(`/NhomDonVi/thongtin/${id_cu}`);
            } else {
                alert('Có lỗi xảy ra khi thêm chức vụ');
            }
        } catch (error) {
            console.error('Error adding position:', error);
            alert('Có lỗi xảy ra khi kết nối với server');
        }
    };

    return (
        <div className="content-wrapper" style={{ minHeight: '1203.31px' }}>
            <ContentHeader title='Thêm Chức Vụ Sĩ Quan' breadcrumbs={[
                { label: 'Trang Chủ', url: '/' },
                { label: 'Nhóm Đơn Vị', url: '/NhomDonVi' },
                { label: 'Thêm Chức Vụ Sĩ Quan', url: '' },
            ]} />
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-default">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="nhomDonVi">ID-Nhóm Cấp Đơn Vị</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nhomDonVi"
                                                name="nhomDonVi"
                                                value={id}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="tenChucVu">Tên Chức Vụ</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="tenChucVu"
                                                name="tenChucVu"
                                                placeholder='Tên chức vụ'
                                                required
                                                value={tenChucVu}
                                                onChange={(e) => setTenChucVu(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Link className="btn btn-success mr-2" to={`/NhomDonVi/thongtin/${id_cu}`}>Quay Lại</Link>
                                <button type="submit" className="btn btn-primary">Thêm Chức Vụ Sĩ Quan</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AddChucVuSiQuan;
