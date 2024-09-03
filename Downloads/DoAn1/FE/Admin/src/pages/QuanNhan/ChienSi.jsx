import React, { useState, useEffect } from 'react';

const ChienSi = () => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]); // Dữ liệu gốc
    const [filteredData, setFilteredData] = useState([]); // Dữ liệu sau khi lọc
    const [paginatedData, setPaginatedData] = useState([]); // Dữ liệu phân trang
    const [totalPages, setTotalPages] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/SiQuan/timsq');
            const result = await response.json();
            setData(result.data);
            setFilteredData(result.data); // Ban đầu, dữ liệu sau khi lọc là toàn bộ dữ liệu
            updatePagination(result.data); // Cập nhật phân trang
        };
        fetchData();
    }, []);

    useEffect(() => {
        updatePagination(filteredData); // Cập nhật phân trang mỗi khi currentPage hoặc filteredData thay đổi
    }, [currentPage, filteredData]);

    const updatePagination = (data) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedData(data.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(data.length / itemsPerPage));
        setHasNext(currentPage < Math.ceil(data.length / itemsPerPage));
        setHasPrevious(currentPage > 1);
    };

    const handleNextPage = () => {
        if (hasNext) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (hasPrevious) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const openViewModal = (item) => {
        setSelectedItem(item);
        setIsViewModalOpen(true);
    };

    const closeViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedItem(null);
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        // Lọc dữ liệu dựa trên query
        const filtered = data.filter((item) =>
            item.HoTen.toLowerCase().includes(query) ||
            item.MaQuanNhan.toLowerCase().includes(query) ||
            item.TenDonVi.toLowerCase().includes(query)
        );
        setFilteredData(filtered); // Cập nhật dữ liệu sau khi lọc
        setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
    };

    return (
        <div className="bg-white p-4 rounded shadow-md" style={{ marginLeft: '16%' }}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Tìm kiếm quân nhân</h2>
                <button
                    onClick={openAddModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Thêm mới
                </button>
            </div>

            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Tìm kiếm theo tên, mã quân nhân, hoặc đơn vị"
                className="mb-4 px-4 py-2 border rounded w-full"
            />

            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Họ Tên</th>
                        <th className="py-2">Mã Quân Nhân</th>
                        <th className="py-2">Đơn Vị</th>
                        <th className="py-2">Cấp Bậc</th>
                        <th className="py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item) => (
                        <tr key={item.id}>
                            <td className="border px-4 py-2">{item.HoTen}</td>
                            <td className="border px-4 py-2">{item.MaQuanNhan}</td>
                            <td className="border px-4 py-2">{item.TenDonVi}</td>
                            <td className="border px-4 py-2">{item.TenCapBac}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => openViewModal(item)}
                                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    Xem
                                </button>
                                <button
                                    onClick={() => console.log('Delete', item.id)} // Replace with actual delete logic
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={!hasPrevious}
                    className={`px-4 py-2 rounded bg-blue-500 text-white ${!hasPrevious && 'opacity-50 cursor-not-allowed'}`}
                >
                    Previous
                </button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={!hasNext}
                    className={`px-4 py-2 rounded bg-blue-500 text-white ${!hasNext && 'opacity-50 cursor-not-allowed'}`}
                >
                    Next
                </button>
            </div>

            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeAddModal}>&times;</span>
                        <h2>Thêm mới quân nhân</h2>
                        {/* Form for adding a new item */}
                    </div>
                </div>
            )}

            {/* View Modal */}
            {isViewModalOpen && selectedItem && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeViewModal}>&times;</span>
                        <h2>Chi tiết quân nhân</h2>
                        <p>Họ Tên: {selectedItem.HoTen}</p>
                        <p>Mã Quân Nhân: {selectedItem.MaQuanNhan}</p>
                        <p>Đơn Vị: {selectedItem.TenDonVi}</p>
                        <p>Cấp Bậc: {selectedItem.TenCapBac}</p>
                        {/* Display additional details */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChienSi;
