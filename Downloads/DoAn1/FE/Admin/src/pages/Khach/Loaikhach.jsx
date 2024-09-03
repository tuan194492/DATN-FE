import React, { Component } from 'react';
import { fetchLoaiKhach, createLoaiKhach, updateLoaiKhach, deleteLoaiKhach } from '../../service/apiKhach/ApiLoaiKhach';

class LoaiKhach extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaikhachs: [], // Khởi tạo với mảng rỗng
            newLoaiKhach: { id: '', TenLoaiKhach: '' },
            isAddModalOpen: false,
            isViewModalOpen: false,
            currentLoaiKhach: null,
            searchQuery: ''
        };
    }

    // Lấy danh sách danh mục từ API khi component được render lần đầu tiên
    componentDidMount() {
        this.loadLoaiKhachs();
    }

    // Hàm tải danh sách danh mục từ API
    loadLoaiKhachs = async () => {
        try {
            const loaikhachs = await fetchLoaiKhach();           
            this.setState({ loaikhachs });
        } catch (error) {
            console.error('Failed to fetch loai khach:', error);
        }
    };

    // Mở modal thêm danh mục
    openAddModal = () => {
        this.setState({ isAddModalOpen: true });
    };

    // Đóng modal thêm danh mục
    closeAddModal = () => {
        this.setState({ isAddModalOpen: false, newLoaiKhach: { id: '', TenLoaiKhach: '' } });
    };

    // Hàm xử lý thêm danh mục mới
    addLoaiKhach = async () => {
        const { loaikhachs, newLoaiKhach } = this.state;
        if (newLoaiKhach.TenLoaiKhach) {
            try {
                const addedLoaiKhach = await createLoaiKhach(newLoaiKhach);
                this.setState({
                    loaikhachs: [...loaikhachs, addedLoaiKhach],
                    newLoaiKhach: { id: '', TenLoaiKhach: '' },
                    isAddModalOpen: false   
                });
                this.loadLoaiKhachs();
            } catch (error) {
                console.error('Failed to add loai khach:', error);
            }
        }
    };

    // Mở modal xem/cập nhật danh mục
    openViewModal = (loaikhach) => {
        this.setState({ isViewModalOpen: true, currentLoaiKhach: loaikhach });
    };

    // Đóng modal xem/cập nhật danh mục
    closeViewModal = () => {
        this.setState({ isViewModalOpen: false, currentLoaiKhach: null });
    };

    // Hàm xử lý cập nhật danh mục
    updateLoaiKhach = async () => {
        const { loaikhachs, currentLoaiKhach } = this.state;
        try {
            const updatedLoaiKhach = await updateLoaiKhach(currentLoaiKhach.id, currentLoaiKhach);
            console.log(updatedLoaiKhach)
            const updatedLoaiKhachs = loaikhachs.map(loaikhach =>
                loaikhach.id === updatedLoaiKhach.id ? updatedLoaiKhach : loaikhach
            );
            this.setState({ loaikhachs: updatedLoaiKhachs, isViewModalOpen: false, currentLoaiKhach: null });
            this.loadLoaiKhachs();
        } catch (error) {
            console.error('Failed to update loai khach:', error);
        }
    };

    // Hàm xử lý xóa danh mục
    deleteLoaiKhach = async (loaikhach_id) => {
        try {
            await deleteLoaiKhach(loaikhach_id);
            const updatedLoaiKhachs = this.state.loaikhachs.filter(loaikhach => loaikhach.id !== loaikhach_id);
            this.setState({ loaikhachs: updatedLoaiKhachs });
        } catch (error) {
            console.error('Failed to delete loai khach:', error);
        }
    };

    // Hàm xử lý thay đổi giá trị của input khi thêm hoặc cập nhật danh mục
    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            newLoaiKhach: { ...prevState.newLoaiKhach, [name]: value },
            currentLoaiKhach: prevState.currentLoaiKhach ? { ...prevState.currentLoaiKhach, [name]: value } : null
        }));
    };

    // Hàm xử lý thay đổi giá trị của input tìm kiếm
    handleSearchChange = (e) => {
        this.setState({ searchQuery: e.target.value });
    };

    render() {
        const { loaikhachs, newLoaiKhach, isAddModalOpen, isViewModalOpen, currentLoaiKhach, searchQuery } = this.state;
        const filteredLoaiKhachs = (loaikhachs || []).filter(loaikhach =>
            loaikhach && loaikhach.TenLoaiKhach && loaikhach.TenLoaiKhach.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 " style={{ marginLeft: '16%' }}>
                <strong className="text-gray-700 font-medium text-2xl">QUẢN LÝ ĐỊNH DANH KHÁCH: LOẠI KHÁCH</strong>
                <div className="border-x border-gray-200 rounded-sm mt-3">
                    <div className="mt-4 flex justify-between">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchQuery}
                            onChange={this.handleSearchChange}
                            className="border px-2 py-1 rounded"
                        />
                        <button onClick={this.openAddModal} className="bg-blue-500 text-white px-4 py-1 rounded">
                            Thêm mới
                        </button>
                    </div>
                    <table className="w-full text-gray-700 mt-4">
                        <thead>
                            <tr>
                                <th>Mã loại khách</th>
                                <th>Tên loại khách</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLoaiKhachs.map((loaikhach) => (
                                <tr key={loaikhach.id}>
                                    <td>{loaikhach.id}</td>
                                    <td>{loaikhach.TenLoaiKhach}</td>
                                    <td>
                                        <button
                                            onClick={() => this.openViewModal(loaikhach)}
                                            className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => this.deleteLoaiKhach(loaikhach.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Modal thêm danh mục */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                        <div className="bg-white rounded-lg w-1/3 p-6">
                            <h2 className="text-xl mb-4">Thêm mới loại khách</h2>
                            <form>
                                <input
                                    type="text"
                                    name="TenLoaiKhach"
                                    placeholder="Loại khách"
                                    value={newLoaiKhach.TenLoaiKhach}
                                    onChange={this.handleInputChange}
                                    className="border px-2 py-1 mb-2 w-full"
                                />
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={this.addLoaiKhach}
                                        className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        onClick={this.closeAddModal}
                                        className="bg-red-500 text-white px-4 py-1 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* Modal xem/cập nhật danh mục */}
                {isViewModalOpen && currentLoaiKhach && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                        <div className="bg-white rounded-lg w-1/3 p-6">
                            <h2 className="text-xl mb-4">View / Update loại khách</h2>
                            <form>
                                <input
                                    type="text"
                                    name="id"
                                    placeholder="Mã loại khách"
                                    value={currentLoaiKhach.id}
                                    disabled
                                    className="border px-2 py-1 mb-2 w-full"
                                />
                                <input
                                    type="text"
                                    name="TenLoaiKhach"
                                    placeholder="Loại khách"
                                    value={currentLoaiKhach.TenLoaiKhach}
                                    onChange={this.handleInputChange}
                                    className="border px-2 py-1 mb-2 w-full"
                                />
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={this.updateLoaiKhach}
                                        className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        onClick={this.closeViewModal}
                                        className="bg-red-500 text-white px-4 py-1 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default LoaiKhach;
