import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUser, editUser } from "../../Store/actions";

class DanhSachSinhVien extends Component {
  state = {
    mangSinhVien: [],
  };
  static getDerivedStateFromProps = (nextProps, currentState) => {
    if (nextProps.svSearch.length !== 0) {
      return (currentState.mangSinhVien = nextProps.svSearch);
    }
    return (currentState.mangSinhVien = nextProps.mangSinhVien);
  };
  render() {
    const { mangSinhVien } = this.state;
    const { flag } = this.props;
    return (
      <div className="mt-10">
        <div>
          <table className="container-fluid mt-5">
            <thead className="bg-black p-5 text-white text-lg">
              <tr className="">
                <th className="p-3"></th>
                <th className="p-3">Mã SV</th>
                <th className="p-3">Họ tên</th>
                <th className="p-3">Số điện thoại</th>
                <th className="p-3">Email</th>
                <th className="p-3"></th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody >
              {!flag ? (
              <tr>
                <td className="text-center" colSpan={5}>
                  Không tìm thấy kết quả này
                </td>
              </tr>
            ) :(mangSinhVien.map((item, index) => (
                <tr key={item.id}>
                  <td></td>
                  <td>{item.maSV}</td>
                  <td>{item.fullName}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.email}</td>
                  <td></td>
                  <td>
                    <button
                      className="btn btn-danger me-3"
                      onClick={() => {
                        this.props.dispatch(deleteUser(item.id));
                      }}
                    >
                      Xoá
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.props.dispatch(editUser(item.id));
                      }}
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.QuanLySinhVien,
  };
};

export default connect(mapStateToProps)(DanhSachSinhVien);
