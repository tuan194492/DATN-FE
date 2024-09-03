import React, { useState, useEffect } from 'react';

const DanhSachQuanNhan = () => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]); // Dữ liệu gốc
    const [filteredData, setFilteredData] = useState([]); // Dữ liệu sau khi lọc
    const [paginatedData, setPaginatedData] = useState([]); // Dữ liệu phân trang
    const [totalPages, setTotalPages] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Tìm kiếm quân nhân</h2>
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
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item) => (
                        <tr key={item.id}>
                            <td className="border px-4 py-2">{item.HoTen}</td>
                            <td className="border px-4 py-2">{item.MaQuanNhan}</td>
                            <td className="border px-4 py-2">{item.TenDonVi}</td>
                            <td className="border px-4 py-2">{item.TenCapBac}</td>
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
        </div>
    );
};

export default DanhSachQuanNhan;
