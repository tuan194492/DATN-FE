import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const AddChucVuQuanNhan = () => {
    const { id } = useParams();

    const breadcrumbs = [
        { label: 'Trang Chủ', url: '/' },
        { label: 'Nhóm Đơn Vị', url: '/NhomDonVi' },
        { label: 'Thêm Chức Vụ Quân Nhân', url: '' },
    ];

    return (
        <div className="content-wrapper" style={{ minHeight: '1203.31px' }}>
            <ContentHeader title='Thêm Chức Vụ Quân Nhân' breadcrumbs={breadcrumbs} />
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-default">
                        {/* /.card-header */}
                        <div className="card-body">
                            <form method="post" encType="multipart/form-data">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="nhomDonVi">Nhóm Đơn Vị</label>
                                            <input type="text" className="form-control" id="nhomDonVi" name="nhomDonVi" placeholder='Tên nhóm đơn vị' required value={id}/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="tenChucVu">Tên Chức Vụ</label>
                                            <input type="text" className="form-control" id="tenChucVu" name="tenChucVu" placeholder='Tên chức vụ' required />
                                        </div>
                                    </div>
                                </div>
                                <Link className="btn btn-success mr-2" to={`/NhomDonVi/thongtin/${id}`}>Quay Lại</Link>
                                <button className="btn btn-primary">Thêm Chức Vụ Quân Nhân</button>
                            </form>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
        </div>
    );
};

export default AddChucVuQuanNhan;
