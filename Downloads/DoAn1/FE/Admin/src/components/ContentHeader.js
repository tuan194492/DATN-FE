import React from 'react';

const ContentHeader = ({ title, breadcrumbs }) => {
  return (
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6 text-left">
            <h1>{title}</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={index} className="breadcrumb-item">
                  {breadcrumb.url ? (
                    <a href={breadcrumb.url}>{breadcrumb.label}</a>
                  ) : (
                    <span>{breadcrumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentHeader;
