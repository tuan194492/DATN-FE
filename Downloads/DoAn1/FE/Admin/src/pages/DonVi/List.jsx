import React, { Component } from 'react';
import { fetchNhomDonVi } from '../../service/apiNhomDonVi/ApiNhomDonVi';
import { fetchTimDonVi ,fetchDetailDonViById, fetchDropdownDonViCha, createNhomDonVi} from '../../service/apiDonVi/ApiDonVi';
import { fetchCapDonVi } from '../../service/apiCapDonVi/ApiCapDonVi';

class DonVi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allnhomdonvis: [],
            timdonvis: [],
            newDonVi: {
                CapDonVi: '',
                MaDonVi: '',
                TenDonVi: '',
                DonViCapTren: '',
                SoDienThoai: '',
                DiaDiem: ''
            },
            isAddModalOpen: false,
            isViewModalOpen: false,
            searchQuery: '',
            danhsachcapdonvi: [], // Định nghĩa danhsachcapdonvi
            danhsachdonvicaptren: [], // Định nghĩa danhsachdonvicaptren
            selectedDonVi: {
                CapDonVi: '',
                MaDonVi: '',
                TenDonVi: '',
                DonViCapTren: '',
                SoDienThoai: '',
                DiaDiem: ''
            }
        };
    }

    componentDidMount() {
        this.loadAllNhomDonVi();
    }

    loadAllNhomDonVi = async () => {
        try {
            const getallnhomdonvi = await fetchNhomDonVi();
            this.setState({ allnhomdonvis: getallnhomdonvi });
        } catch (error) {
            console.error('Failed to fetch NhomDonVi:', error);
        }
    };

    loadTimDonVi = async (nhomDonViId) => {
        console.log('Fetching TimDonVi for NhomDonVi ID:', nhomDonViId);
        try {
            const timdonvis = await fetchTimDonVi(nhomDonViId);
            this.setState({ timdonvis: timdonvis });
        } catch (error) {
            console.error('Failed to fetch TimDonVi:', error);
        }
    };

    loadCapDonVi = async (nhomDonViId) => {
        console.log('Fetching CapDonVi for NhomDonVi ID:', nhomDonViId);
        try {
            const capdonvis = await fetchCapDonVi(nhomDonViId);
            this.setState({ danhsachcapdonvi: capdonvis });
        } catch (error) {
            console.error('Failed to fetch CapDonVi:', error);
        }
    };

    loadDropdownDonViCha = async (CapDonViId) => {
        console.log('Fetching loadDropdownDonViCha with CapDonViId:', CapDonViId);
        try {
            const dropdownDonViCha = await fetchDropdownDonViCha(CapDonViId);
            this.setState({ danhsachdonvicaptren: dropdownDonViCha });
        } catch (error) {
            console.error('Failed to fetch loadDropdownDonViCha:', error);
        }
    };



    LoadDetailDonVi = async (id) => {
        try {
            const details = await fetchDetailDonViById(id);
            console.log(details)
            this.setState({ selectedDonVi: details, isViewModalOpen: true });
        } catch (error) {
            console.error('Failed to fetch detail DonVi:', error);
        }
    };

    handleAddNewDonVi = async () => {
        try {
            await createNhomDonVi(this.state.newDonVi);
            console.log(this.state.newDonVi);
            this.closeAddModal();
            this.loadAllNhomDonVi();
        } catch (error) {
            console.error('Failed to create new DonVi:', error);
        }
    };

    openAddModal = () => {
        this.setState({ isAddModalOpen: true });
    };

    closeAddModal = () => {
        this.setState({
            isAddModalOpen: false,
            newDonVi: {
                NhomDonVi: '',
                CapDonVi: '',
                MaDonVi: '',
                TenDonVi: '',
                DonViCapTren: '',
                SoDienThoai: '',
                DiaDiem: ''
            }
        });
    };

    openViewModal = () => {
        this.setState({ isViewModalOpen: true });
    };

    closeViewModal = () => {
        this.setState({ isViewModalOpen: false });
    };

    handleSelectChange = async (event) => {
        const selectedId = event.target.value;
        this.setState({ newDonVi: { ...this.state.newDonVi, NhomDonVi: selectedId } });

        if (selectedId) {
            try {
                console.log('Selected NhomDonVi ID:', selectedId);
                await this.loadTimDonVi(selectedId); // Gọi hàm loadTimDonVi
                await this.loadCapDonVi(selectedId); // Gọi hàm loadCapDonVi để lấy danh sách CapDonVi
                // Bỏ dòng dưới đây
                // await this.loadDropdownDonViCha(selectedId);
            } catch (error) {
                console.error('Failed to load timdonvi or capdonvi:', error);
            }
        }
    };


    handleInputChange = async (event) => {
        const { name, value } = event.target;
        this.setState({ newDonVi: { ...this.state.newDonVi, [name]: value } });

        if (name === 'CapDonVi' && value) {
            try {
                await this.loadDropdownDonViCha(value);
            } catch (error) {
                console.error('Failed to load DropdownDonViCha:', error);
            }
        }
    };


    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    render() {
        const { allnhomdonvis, timdonvis, newDonVi, danhsachcapdonvi, danhsachdonvicaptren, isAddModalOpen, isViewModalOpen, searchQuery } = this.state;

        const filteredTimDonVis = timdonvis.filter(timdonvi =>
            (timdonvi?.id?.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
            (timdonvi?.MaDonVi?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (timdonvi?.TenDonVi?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (timdonvi?.DiaDiem?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (timdonvi?.SoDienThoai?.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        return (
            <>
                <div className="bg-white p-4 rounded shadow-md" style={{ marginLeft: '16%' }}>
                    <h2 className="text-xl font-bold mb-4">Quản Lý Đơn Vị</h2>
                    <div className="border-x border-gray-200 rounded-sm mt-3">
                        <div className="mt-4 flex items-center">
                            <div className="flex space-x-4 w-full max-w-md">
                                <select
                                    name="NhomDonVi"
                                    value={newDonVi.NhomDonVi}
                                    onChange={this.handleSelectChange} // Sử dụng handleSelectChange
                                    className="border border-gray-300 px-3 py-2 h-12 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    style={{ width: '50%' }}
                                >
                                    <option value="">Nhóm đơn vị</option>
                                    {allnhomdonvis.map(allnhomdonvi => (
                                        <option key={allnhomdonvi.id} value={allnhomdonvi.id}>
                                            {allnhomdonvi.TenNhom}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={searchQuery}
                                    onChange={this.handleSearchChange}
                                    className="border border-gray-300 px-3 py-2 h-12 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    style={{ width: '50%' }}
                                />
                            </div>
                            <button
                                onClick={this.openAddModal}
                                className="bg-blue-500 text-white px-6 py-2 h-12 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out ml-auto"
                            >
                                Thêm mới
                            </button>
                        </div>

                        <table className="w-full text-gray-700 mt-4">
                            <thead>
                                <tr>
                                    <th className="py-2">Mã đơn vị</th>
                                    <th className="py-2">Tên đơn vị</th>
                                    <th className="py-2">Địa điểm</th>
                                    <th className="py-2">Số điện thoại</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTimDonVis.map(timdonvi => (
                                    <tr key={timdonvi.id}>
                                        <td className="border px-4 py-2">{timdonvi.MaDonVi}</td>
                                        <td className="border px-4 py-2">{timdonvi.TenDonVi}</td>
                                        <td className="border px-4 py-2">{timdonvi.DiaDiem}</td>
                                        <td className="border px-4 py-2">{timdonvi.SoDienThoai}</td>
                                        <td>
                                            <button
                                                onClick={e  => {
                                                    this.LoadDetailDonVi(timdonvi.id);
                                                }}
                                                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => this.traKhach()}
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

                    {isAddModalOpen && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                            <div className="bg-white rounded-lg w-1/3 p-6">
                                <h2 className="text-xl mb-4">Thêm mới đơn vị</h2>
                                <form>
                                    <select
                                        name="NhomDonVi"
                                        value={newDonVi.NhomDonVi}
                                        onChange={this.handleSelectChange}
                                        className="border px-2 py-1 mb-2 w-full"
                                    >
                                    <option value="">Nhóm đơn vị</option>
                                    {allnhomdonvis.map(allnhomdonvi => (
                                        <option key={allnhomdonvi.id} value={allnhomdonvi.id}>
                                            {allnhomdonvi.TenNhom}
                                        </option>
                                    ))}
                                    </select>

                                    <select
                                        name="CapDonVi"
                                        value={newDonVi.CapDonVi}
                                        onChange={this.handleInputChange}
                                        className="border px-2 py-1 mb-2 w-full"
                                    >
                                        <option value="">Cấp đơn vị</option>
                                        {danhsachcapdonvi.map(capdonvi => (
                                            <option key={capdonvi.id} value={capdonvi.id}>
                                                {capdonvi.Ten}
                                            </option>
                                        ))}
                                    </select>

                                    <input
                                        type="text"
                                        name="MaDonVi"
                                        value={newDonVi.MaDonVi}
                                        onChange={this.handleInputChange}
                                        placeholder="Mã đơn vị"
                                        className="border px-2 py-1 mb-2 w-full"
                                    />
                                    <input
                                        type="text"
                                        name="TenDonVi"
                                        value={newDonVi.TenDonVi}
                                        onChange={this.handleInputChange}
                                        placeholder="Tên đơn vị"
                                        className="border px-2 py-1 mb-2 w-full"
                                    />
                                    <select
                                        name="DonViCapTren"
                                        value={newDonVi.DonViCapTren}
                                        onChange={this.handleInputChange}
                                        className="border px-2 py-1 mb-2 w-full"
                                    >
                                        <option value="">Đơn vị cấp trên</option>
                                        {danhsachdonvicaptren.map(capdonvi => (
                                            <option key={capdonvi.id} value={capdonvi.id}>
                                                {capdonvi.TenDonVi}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        name="SoDienThoai"
                                        value={newDonVi.SoDienThoai}
                                        onChange={this.handleInputChange}
                                        placeholder="Số điện thoại"
                                        className="border px-2 py-1 mb-2 w-full"
                                    />
                                    <input
                                        type="text"
                                        name="DiaDiem"
                                        value={newDonVi.DiaDiem}
                                        onChange={this.handleInputChange}
                                        placeholder="Địa điểm"
                                        className="border px-2 py-1 mb-2 w-full"
                                    />

                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={this.closeAddModal}
                                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={this.handleAddNewDonVi}
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {isViewModalOpen && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                            <div className="bg-white rounded-lg w-1/3 p-6">
                                <h2 className="text-xl mb-4">Chi tiết đơn vị</h2>
                              <form>
                                <div className="mb-4">
                                  <label className="block text-gray-700">Nhóm đơn vị:</label>
                                  <input
                                    type="text"
                                    value={this.state.selectedDonVi.NhomDonVi.Ten}
                                    readOnly
                                    className="border px-2 py-1 w-full"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label className="block text-gray-700">Cấp đơn vị:</label>
                                  <input
                                    type="text"
                                    value={this.state.selectedDonVi.CapNhomDonVi.Ten}
                                    readOnly
                                    className="border px-2 py-1 w-full"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label className="block text-gray-700">Mã đơn vị:</label>
                                  <input
                                    type="text"
                                    value={this.state.selectedDonVi.MaDonVi}
                                    readOnly
                                    className="border px-2 py-1 w-full"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label className="block text-gray-700">Tên đơn vị:</label>
                                  <input
                                    type="text"
                                    value={this.state.selectedDonVi.TenDonVi}
                                    readOnly
                                    className="border px-2 py-1 w-full"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label className="block text-gray-700">Đơn vị cấp trên:</label>
                                  <input
                                    type="text"
                                    value={this.state.selectedDonVi.TenDonViCapTren}
                                    readOnly
                                    className="border px-2 py-1 w-full"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label className="block text-gray-700">Địa điểm:</label>
                                  <input
                                    type="text"
                                    value={this.state.selectedDonVi.DiaDiem}
                                    readOnly
                                    className="border px-2 py-1 w-full"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label className="block text-gray-700">Số điện thoại:</label>
                                  <input
                                    type="text"
                                    value={this.state.selectedDonVi.SoDienThoai}
                                    readOnly
                                    className="border px-2 py-1 w-full"
                                  />
                                </div>
                                <div className="flex justify-end">
                                  <button
                                    type="button"
                                    onClick={this.closeViewModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                  >
                                    Close
                                  </button>
                                </div>
                              </form>
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default DonVi;
