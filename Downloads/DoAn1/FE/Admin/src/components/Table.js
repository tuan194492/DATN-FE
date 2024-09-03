import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({ headers, data, renderRow, addPath, addText, cardHeader = true, search = true }) => {
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              {
                cardHeader == true ? 
                  <div className={search == true ? 'card-header d-flex' : 'card-header text-right'}>
                    {
                      search == true ? <input type="text" className="form-control text-left col-md-2" placeholder="Tìm kiếm" /> : null
                    }
                    <div className={search == true ? 'col-md-10 text-right' : null}>
                      <Link to={addPath} className='btn btn-primary'>
                        {addText}
                      </Link>
                    </div>
                  </div>
                : 
                  null
              }
              <div className="card-body table-responsive p-0">
                <table className="table table-hover">
                  <thead>
                    <tr style={{ textAlign: 'left' }}>
                      {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: 'left' }}>
                    {data.map((item, index) => (
                      <tr key={index}>{renderRow(item, index)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Table;
