import React, { Component } from 'react';
import { fetchTheKhach, createTheKhach, deleteTheKhach } from '../../service/apiKhach/ApiTheKhach';

class TheKhach extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thekhachs: [], // Khởi tạo với mảng rỗng
            newTheKhach: { id: '', sothe: '' },
            isAddModalOpen: false,
            isViewModalOpen: false,
            currentTheKhach: null,
            searchQuery: ''
        };
    }

    // Lấy danh sách danh mục từ API khi component được render lần đầu tiên
    componentDidMount() {
        this.loadTheKhachs();
    }

    // Hàm tải danh sách danh mục từ API
    loadTheKhachs = async () => {
        try {
            const thekhachs = await fetchTheKhach();          
            this.setState({ thekhachs });
        } catch (error) {
            console.error('Failed to fetch the khach:', error);
        }
    };

    // Mở modal thêm danh mục
    openAddModal = () => {
        this.setState({ isAddModalOpen: true });
    };

    // Đóng modal thêm danh mục
    closeAddModal = () => {
        this.setState({ isAddModalOpen: false, newTheKhach: { id: '', sothe: '' } });
    };

    // Hàm xử lý thêm danh mục mới
    addTheKhach = async () => {
        const { thekhachs, newTheKhach } = this.state;
        if (newTheKhach.sothe) {
            try {
                const response = await createTheKhach(newTheKhach);
                if (response.status === 'success') {
                    // Thêm khách hàng mới vào danh sách hiện tại
                    this.setState({
                        thekhachs: [...thekhachs, newTheKhach],  // Thêm trực tiếp newTheKhach vào danh sách
                        newTheKhach: { id: '', sothe: '' },
                        isAddModalOpen: false   
                    });
                    this.loadTheKhachs(); // Tải lại danh sách khách hàng
                } else {
                    console.error('Failed to add the khach:', response.message);
                }
            } catch (error) {
                console.error('Failed to add the khach:', error);
            }
        }
    };
    

    // Mở modal xem/cập nhật danh mục
    openViewModal = (thekhach) => {
        this.setState({ isViewModalOpen: true, currentTheKhach: thekhach });
    };

    // Đóng modal xem/cập nhật danh mục
    closeViewModal = () => {
        this.setState({ isViewModalOpen: false, currentTheKhach: null });
    };

    // Hàm xử lý cập nhật danh mục
    // updateTheKhach = async () => {
    //     const { thekhachs, currentTheKhach } = this.state;
    //     try {
    //         const updatedTheKhach = await updateTheKhach(currentTheKhach.id, currentTheKhach);
    //         console.log(updatedTheKhach)
    //         const updatedTheKhachs = thekhachs.map(thekhach =>
    //             thekhach.id === updatedTheKhach.id ? updatedTheKhach : thekhach
    //         );
    //         this.setState({ thekhachs: updatedTheKhachs, isViewModalOpen: false, currentTheKhach: null });
    //         this.loadTheKhachs();
    //     } catch (error) {
    //         console.error('Failed to update the khach:', error);
    //     }
    // };

    // Hàm xử lý xóa danh mục
    deleteTheKhach = async (loaikhach_id) => {
        try {
            await deleteTheKhach(loaikhach_id);
            const updatedTheKhachs = this.state.thekhachs.filter(thekhach => thekhach.id !== loaikhach_id);
            this.setState({ thekhachs: updatedTheKhachs });
        } catch (error) {
            console.error('Failed to delete the khach:', error);
        }
    };

    // Hàm xử lý thay đổi giá trị của input khi thêm hoặc cập nhật danh mục
    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            newTheKhach: { ...prevState.newTheKhach, [name]: value },
            currentTheKhach: prevState.currentTheKhach ? { ...prevState.currentTheKhach, [name]: value } : null
        }));
    };

    // Hàm xử lý thay đổi giá trị của input tìm kiếm
    handleSearchChange = (e) => {
        this.setState({ searchQuery: e.target.value });
    };

    render() {
        const { thekhachs, newTheKhach, isAddModalOpen, isViewModalOpen, currentTheKhach, searchQuery } = this.state;
        const filteredTheKhachs = (thekhachs || []).filter(thekhach => {
            const soThe = thekhach && thekhach.SoThe ? thekhach.SoThe.toString().toLowerCase() : '';
            return soThe.includes(searchQuery.toLowerCase());
        });
        
          

        return (
            <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 " style={{ marginLeft: '16%' }}>
                <strong className="text-gray-700 font-medium text-2xl">QUẢN LÝ ĐỊNH DANH KHÁCH: THẺ KHÁCH</strong>
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
                                <th>ID</th>
                                <th>Số thẻ</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTheKhachs.map((thekhach) => (
                                <tr key={thekhach.id}>
                                    <td>{thekhach.id}</td>
                                    <td>{thekhach.SoThe}</td>
                                    <td>
                                        {/* <button
                                            onClick={() => this.openViewModal(thekhach)}
                                            className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                        >
                                            View
                                        </button> */}
                                        <button
                                            onClick={() => this.deleteTheKhach(thekhach.id)}
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
                                    name="sothe"
                                    placeholder="Số thẻ"
                                    value={newTheKhach.sothe}
                                    onChange={this.handleInputChange}
                                    className="border px-2 py-1 mb-2 w-full"
                                />
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={this.addTheKhach}
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
                {/* {isViewModalOpen && currentTheKhach && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                        <div className="bg-white rounded-lg w-1/3 p-6">
                            <h2 className="text-xl mb-4">View / Update loại khách</h2>
                            <form>
                                <input
                                    type="text"
                                    name="id"
                                    placeholder="Mã loại khách"
                                    value={currentTheKhach.id}
                                    disabled
                                    className="border px-2 py-1 mb-2 w-full"
                                />
                                <input
                                    type="text"
                                    name="SoThe"
                                    placeholder="Loại khách"
                                    value={currentTheKhach.SoThe}
                                    onChange={this.handleInputChange}
                                    className="border px-2 py-1 mb-2 w-full"
                                />
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={this.updateTheKhach}
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
                )} */}
            </div>
        );
    }
}

export default TheKhach;
