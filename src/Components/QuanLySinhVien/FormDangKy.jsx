import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser,updateUser, searchUser } from "../../Store/actions";

class FormDangKy extends Component {
  stateDefault = {
    maSV: "",
    fullName: "",
    phoneNumber: "",
    email: "",
  };
  state = {
    key: '',
    values: this.stateDefault,
    errors: {},
  };
  handleState = (event) => {
    const { name, value } = event.target;
    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
    });
  };
  handleBlur = (event) => {
    const {
      name,
      title,
      validationMessage,
      validity: { valueMissing, patternMismatch },
    } = event.target;

    let mess = "";
    if (valueMissing) {
      mess = `${title} không được bỏ trống`;
    }
    if (patternMismatch) {
      switch (name) {
        case "maSV":
          mess = `${title} phải từ 5 đến 15 ký tự`;
          break;
        case "phoneNumber":
          mess = `${title} phải là số và 10 số`;
          break;
        default:
          mess = `${title} không đúng định dạng`;
      }
    }
    this.setState({
      errors: {
        ...this.state.errors,
        [name]: mess,
      },
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      return;
    }
    if (this.props.selectedUser) {
      this.props.dispatch(updateUser(this.state.values));
    } else {
      this.props.dispatch(addUser(this.state.values));
    }

    this.setState({
      values: this.stateDefault,
    });
  };

  handleKey = (event) => {
    this.setState({
      key: event.target.value,
    });
  };

  handleSearch = () => {
    this.props.dispatch(searchUser(this.state.key));
  };

  // Chuyển props thành state nội bộ của component
  static getDerivedStateFromProps = (nextProps, currentState) => {
    if (
      nextProps.selectedUser &&
      nextProps.selectedUser.id !== currentState.values.id
    ) {
      currentState.values = nextProps.selectedUser;
    }
    return currentState;
  };

  render() {
    const { selectedUser } = this.props;
    const { maSV, fullName, phoneNumber, email } =
      this.state.values;
    return (
      <div>
        <form
          id="form"
          noValidate
          onSubmit={this.handleSubmit}
        >
          <div className="bg-dark text-white fs-1 ps-5 mb-5">Thông tin sinh viên</div>
          <div className="row ps-5 pe-5">
            <div className="col-6">
            <label class="form-label">Mã sinh viên</label>
              <input
                type="text"
                required
                
                title="Mã sinh viên"
                value={maSV}
                name="maSV"
                pattern="^[a-zA-Z0-9_-]{5,15}$"
                placeholder="Mã sinh viên"
                className="form-control"
                onChange={this.handleState}
                onBlur={this.handleBlur}
              />
              <span>
                {this.state.errors.maSV}
              </span>
            </div>
            <div className="col-6">
            <label class="form-label">Họ tên</label>
              <input
                type="text"
                required
                title="Họ tên"
                value={fullName}
                name="fullName"
                placeholder="Họ tên"
                className="form-control"
                onChange={this.handleState}
                onBlur={this.handleBlur}
              />
              <span>
                {this.state.errors.fullName}
              </span>
            </div>
            <div className="col-6">
            <label class="form-label">Số điện thoại</label>
              <input
                type="text"
                required
                value={phoneNumber}
                title="Số điện thoại"
                name="phoneNumber"
                pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$"
                placeholder="Số điện thoại"
                className="form-control"
                onChange={this.handleState}
                onBlur={this.handleBlur}
              />
              <span>
                {this.state.errors.phoneNumber}
              </span>
            </div>
            <div className="col-6">
            <label class="form-label">Email</label>
              <input
                type="text"
                required
                value={email}
                title="Email"
                name="email"
                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                placeholder="Email"
                className="form-control"
                onChange={this.handleState}
                onBlur={this.handleBlur}
              />
              <span>
                {this.state.errors.email}
              </span>
            </div>
          </div>
          <div className="mt-3 ms-5">
            <button
              type="submit"
              className={`btn btn-success ${!this.props.selectedUser ? "" : "hidden"
                }
    `}
            >
              Thêm Sinh Viên
            </button>
            <button
              type="submit"
              className={`btn btn-success ms-3 ${this.props.selectedUser ?? "hidden"
                }`}
            >
              Cập Nhật
            </button>
            
          </div>
          
          <div className="mt-5 ms-5">
            <p className="text-left">Tìm sinh viên</p>
            <div className="col-4">
              <input
                type="search"
                name="Search"
                value={this.state.key}
                placeholder="Nhập tên SV"
                className="form-control"
                onChange={this.handleKey} />
              <button
                type="button"
                title="search"
                className="btn btn-success mt-3"
                onClick={this.handleSearch}>
                Tìm
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.QuanLySinhVien,
  };
};

export default connect(mapStateToProps)(FormDangKy);
