import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataNhanVien: [],
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "https://localhost:5001/api/Users",
      data: null,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    axios({
      method: "get",
      url: "https://localhost:5001/api/NhanVien",
      data: null,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({ dataNhanVien: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getTenUser = () => {
    var { data } = this.state;

    if (data.roleID === "RL02") {
      return (
        <div>
          <ul className="list-group">
            <Link style={{ textDecoration: "none" }} to="/quanlyphongban">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý phòng ban
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/quanlycapbac">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý cấp bậc
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/quanlynhanvien">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý nhân viên
              </li>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/quanlychiphi">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý chi phí
              </li>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/quanlydinhmuc">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý định mức
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/quanlychuyencongtac">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý chuyến công tác
              </li>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/nhanviencongtac">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý nhân viên công tác
              </li>
            </Link>

            <Link
              style={{ textDecoration: "none" }}
              to="/quanlydexuatthanhtoan"
            >
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý đề xuất thanh toán
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/baocaonhanvien">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Báo cáo
              </li>
            </Link>
          </ul>
        </div>
      );
    }
    if (data.roleID === "RL03") {
      return (
        <div>
          <ul className="list-group">
            <Link style={{ textDecoration: "none" }} to="/quanlyphongban">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý phòng ban
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/quanlycapbac">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý cấp bậc
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/quanlynhanvien">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý nhân viên
              </li>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/quanlychiphi">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý chi phí
              </li>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/quanlydinhmuc">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý định mức
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/quanlychuyencongtac">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý chuyến công tác
              </li>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/nhanviencongtac">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý nhân viên công tác
              </li>
            </Link>

            <Link
              style={{ textDecoration: "none" }}
              to="/quanlydexuatthanhtoan"
            >
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý đề xuất thanh toán
              </li>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/duyetdexuatthanhtoan">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Duyệt đề xuất thanh toán
              </li>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/baocaotruongbophan">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Báo cáo
              </li>
            </Link>
          </ul>
        </div>
      );
    }
    if (data.roleID === "RL04") {
      return (
        <div>
          <ul className="list-group">
            <li className="list-group-item list-group-item-action">
              <div>Chức năng</div>
            </li>
            <Link style={{ textDecoration: "none" }} to="/quanlyphongban">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý phòng ban
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/quanlycapbac">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý cấp bậc
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/quanlynhanvien">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý nhân viên
              </li>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/quanlychiphi">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý chi phí
              </li>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/quanlydinhmuc">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý định mức
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/quanlychuyencongtac">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý chuyến công tác
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/nhanviencongtac">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý nhân viên công tác
              </li>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to="/quanlydexuatthanhtoan"
            >
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý đề xuất thanh toán
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/duyetdexuatthanhtoan">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Duyệt đề xuất thanh toán
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/quanlythanhtoan">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý thanh toán
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/baocaolanhdao">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Báo cáo
              </li>
            </Link>
          </ul>
        </div>
      );
    }
    if (data.roleID === "RL05") {
      return (
        <div>
          <ul className="list-group">
            <li className="list-group-item list-group-item-action">
              <h4>Chức năng</h4>
            </li>
            <Link
              style={{ textDecoration: "none" }}
              to="/quanlyphongban"
              exact
              activeClassName="is-active"
            >
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý phòng ban
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/quanlycapbac">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý cấp bậc
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/quanlynhanvien">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý nhân viên
              </li>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/quanlychiphi">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý chi phí
              </li>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/quanlydinhmuc">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý định mức
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/quanlychuyencongtac">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý chuyến công tác
              </li>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/nhanviencongtac">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý nhân viên công tác
              </li>
            </Link>

            <Link
              style={{ textDecoration: "none" }}
              to="/quanlydexuatthanhtoan"
            >
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý đề xuất thanh toán
              </li>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/duyetdexuatthanhtoan">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Duyệt đề xuất thanh toán
              </li>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/baocaolanhdao">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Báo cáo
              </li>
            </Link>
          </ul>
        </div>
      );
    }
    if (data.roleID === "RL01") {
      return (
        <div>
          <ul className="list-group">
            <li className="list-group-item list-group-item-action">
              <h4>Chức năng</h4>
            </li>
            <Link style={{ textDecoration: "none" }} to="/quanlyphongban">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý phòng ban
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/quanlycapbac">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý cấp bậc
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/quanlynhanvien">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý nhân viên
              </li>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/quanlychiphi">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý chi phí
              </li>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/quanlydinhmuc">
              <li
                className="list-group-item list-group-item-action"
                style={{ color: "#007bff" }}
              >
                Quản lý định mức
              </li>
            </Link>
          </ul>
        </div>
      );
    }
  };
  render() {
    return <div className="nav-bar">{this.getTenUser()}</div>;
  }
}
