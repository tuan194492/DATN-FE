import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <body className="hold-transition sidebar-mini layout-fixed">
      <div className="wrapper">
        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
            </li>
          </ul>
        </nav>
        {/* /.navbar */}
        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <Link to="/" className="brand-link">
            <img src="/dist/img/AdminLTELogo.png" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
            <span className="brand-text font-weight-light text-center">HỆ THỐNG QUẢN LÝ</span>
          </Link>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item has-treeview menu-open">
                  <Link to="/" className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Trang Chủ
                    </p>
                  </Link>
                </li>
                <li className="nav-header">QUẢN LÝ ĐƠN VỊ</li>
                <li className="nav-item has-treeview">
                  <Link  to="/NhomDonVi" className="nav-link">
                    <i className="nav-icon fa-solid fa-layer-group" />
                    <p>
                      Nhóm Đơn Vị
                    </p>
                  </Link>
                </li>
                <li className="nav-item has-treeview">
                  <Link to="/DonVi" className="nav-link">
                    <i className="nav-icon fa-solid fa-layer-group" />
                    <p>
                      Đơn Vị
                    </p>
                  </Link>
                </li>
                <li className="nav-header">QUẢN LÝ QUÂN NHÂN</li>
                <li className="nav-item has-treeview">
                  <Link to="/SiQuan" className="nav-link">
                    <i className="nav-icon fa-solid fa-layer-group" />
                    <p>
                      Sĩ Quan
                    </p>
                  </Link>
                 </li>
                 <li className="nav-item has-treeview">
                  <Link to="/ChienSi" className="nav-link">
                    <i className="nav-icon fa-solid fa-layer-group" />
                    <p>
                      Chiến Sĩ
                    </p>
                  </Link>
                 </li> 


                 <li className="nav-header">QUẢN LÝ KHÁCH</li>
                <li className="nav-item has-treeview">
                  <Link to="/LoaiKhach" className="nav-link">
                    <i className="nav-icon fa-solid fa-layer-group" />
                    <p>
                      Loại Khách
                    </p>
                  </Link>
                 </li>
                 <li className="nav-item has-treeview">
                  <Link to="/TheKhach" className="nav-link">
                    <i className="nav-icon fa-solid fa-layer-group" />
                    <p>
                      Thẻ Khách
                    </p>
                  </Link>
                 </li>
                 <li className="nav-header">PHÂN CÔNG KÍP TRỰC</li>
                <li className="nav-item has-treeview">
                  <Link to="/GacCong" className="nav-link">
                    <i className="nav-icon fa-solid fa-layer-group" />
                    <p>
                      Gác Cổng
                    </p>
                  </Link>
                 </li>
                 <li className="nav-item has-treeview">
                  <Link to="/GacCong" className="nav-link">
                    <i className="nav-icon fa-solid fa-layer-group" />
                    <p>
                      Trực ban nội vụ
                    </p>
                  </Link>
                 </li>   
                {/* <li className="nav-header">CÁ NHÂN</li>
                <li className="nav-item has-treeview">
                  <Link to="/doi-thong-tin" className="nav-link">
                    <i className="nav-icon fa-solid fa-lock" />
                    <p>
                      Đổi Thông Tin
                    </p>
                  </Link>
                </li>
                <li className="nav-item has-treeview">
                  <a href="<?php echo base_url('admin/dang-xuat/'); ?>" className="nav-link">
                    <i className="nav-icon fa-solid fa-right-from-bracket" />
                    <p>
                      Đăng Xuất
                    </p>
                  </a>
                </li> */}
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>

    </body>
  );
};

export default Header;
