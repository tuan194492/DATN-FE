import React from 'react';
import { Link } from 'react-router-dom';
import './Table1.css'; // Nhập tệp CSS

const Table1 = ({ headers, renderRow, data, addPath, addText, search }) => (
  <div className="card">
    <div className="card-header">
      <h3 className="card-title">{addText}</h3>
      <Link to={addPath} className="btn btn-primary">Thêm mới</Link>
    </div>
    <div className="card-body">
      <table className="table table-bordered">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? data.map((item, index) => renderRow(item, index)) : (
            <tr>
              <td colSpan={headers.length} className="text-center">Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default Table1;
