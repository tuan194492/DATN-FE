import React, { useState, useEffect } from 'react';
import ContentHeader from '../../components/ContentHeader';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { createCapDonVi, fetchCapDonVi } from '../../service/apiCapDonVi/ApiCapDonVi';

const AddCapDonVi = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        NhomDonVi: id,
        TenCap: '',
        CapTren: '' // Sửa tên từ TenCapTren thành CapTren
    });
    const [capDonViList, setCapDonViList] = useState([]);

    const breadcrumbs = [
        { label: 'Trang Chủ', url: '/' },
        { label: 'Nhóm Đơn Vị', url: '/NhomDonVi' },
        { label: 'Thêm Cấp Đơn Vị', url: '' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCapDonVi(id); // fetch cấp đơn vị từ API
                setCapDonViList(data); // lưu danh sách vào state

            } catch (error) {
                console.error('Error fetching CapDonVi:', error);
            }
        };
        fetchData();
    }, [id]);

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
            const payload = {
                NhomDonVi: formData.NhomDonVi, // Truyền Ten của NhomDonVi
                Ten: formData.TenCap,
                CapTren: formData.CapTren // Truyền id của đơn vị cấp trên
            };

            await createCapDonVi(payload); // Gửi dữ liệu lên API
            alert('Cấp đơn vị đã được thêm thành công!');
            navigate(`/NhomDonVi/thongtin/${id}`); // Điều hướng về trang thông tin nhóm đơn vị
        } catch (error) {
            alert('Có lỗi xảy ra khi thêm cấp đơn vị. Vui lòng thử lại.');
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="content-wrapper" style={{ minHeight: '1203.31px' }}>
            <ContentHeader title='Thêm Cấp Đơn Vị' breadcrumbs={breadcrumbs} />
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-default">
                        <div className="card-body">
                            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="nhomDonVi">Nhóm Đơn Vị</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nhomDonVi"
                                                name="nhomDonVi"
                                                value={id}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="TenCap">Tên Cấp</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="TenCap"
                                                name="TenCap"
                                                placeholder="Tên cấp đơn vị"
                                                value={formData.TenCap}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="CapTren">Tên Cấp Trên</label>
                                            <select
                                                name="CapTren"
                                                value={formData.CapTren}
                                                onChange={handleInputChange}
                                                className="form-control"

                                            >
                                                <option value="">Chọn đơn vị cấp trên</option>
                                                {capDonViList.map(data => (
                                                    <option key={data.id} value={data.id}>
                                                        {data.Ten}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <Link className="btn btn-success mr-2" to={`/NhomDonVi/thongtin/${id}`}>Quay Lại</Link>
                                <button type="submit" className="btn btn-primary">Thêm Cấp Đơn Vị</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AddCapDonVi;
