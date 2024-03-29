import React, { Component } from "react";
import axios from "axios";
import Nav from "./Nav";
import Header from "./Header";
import Footer from "./Footer";
import { connect } from "react-redux";
import * as actions from "./../actions/actions";
import moment from "moment/moment";

class QuanLyChuyenCongTac extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trangThai: "",
      data: [],
      dataSua: [],
      maChuyenCongTac: "",
      tenChuyenCongTac: "",
      ngayBatDau: "",
      ngayKetThuc: "",
      diaDiem: "",
      mucDichCongTac: "",
      moTa: "",
      searchItem: "",
      hienThiSuaUer: [],
      dataNhanVienCongTac: [],
      layMaChuyenCongTac: [],
      layDataChiTiet: {},
      dataUsers: [],
    };
  }
  onChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name]: value,
    });
    // this.onSearch()
  };
  componentDidMount() {
    axios({
      method: "get",
      url: "https://localhost:5001/api/ChuyenCongTac",
      data: null,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => this.props.alertOn_TrangThaiQuyenThatBai(err));
    axios({
      method: "get",
      url: "https://localhost:5001/api/NhanVienCongTac",
      data: null,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({ dataNhanVienCongTac: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    axios({
      method: "get",
      url: "https://localhost:5001/api/Users",
      data: null,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({ dataUsers: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onThemMoi = () => {
    var item = {};
    item.maChuyenCongTac = this.state.maChuyenCongTac;
    item.tenChuyenCongTac = this.state.tenChuyenCongTac;
    item.diaDiem = this.state.diaDiem;
    item.mucDichCongTac = this.state.mucDichCongTac;
    item.ngayBatDau = this.state.ngayBatDau;
    item.ngayKetThuc = this.state.ngayKetThuc;
    item.moTa = this.state.moTa;
    var items = this.state.data;
    // items.push(item)
    this.setState({ data: items });

    console.log(items);
    axios({
      method: "POST",
      url: "https://localhost:5001/api/ChuyenCongTac",
      data: {
        maChuyenCongTac: this.state.maChuyenCongTac,
        tenChuyenCongTac: this.state.tenChuyenCongTac,
        ngayBatDau: this.state.ngayBatDau,
        ngayKetThuc: this.state.ngayKetThuc,
        diaDiem: this.state.diaDiem,
        mucDichCongTac: this.state.mucDichCongTac,
        moTa: this.state.moTa,
        trangThai: "",
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.data)
      .then(() => {
        window.location.reload();
      })
      .then((res) =>
        this.props.alertOn_TrangThaiThemMoiThanhCong(res)
          ? items.push(item)
          : null
      )
      .catch((err) => this.props.alertOn_TrangThaiThemMoiThatBai(err));
  };
  layDataSua = (value) => {
    this.setState({ hienThiSuaUer: value });
  };

  onSua = () => {
    if (window.confirm("Bạn có chắc chắn muốn sửa")) {
      var dataSua = {};
      dataSua.maChuyenCongTac = this.state.hienThiSuaUer.maChuyenCongTac; //this.state.hienThiSuaUer.maPhongBan là data onChange nhập vào
      dataSua.tenChuyenCongTac = this.state.tenChuyenCongTac
        ? this.state.tenChuyenCongTac
        : this.state.hienThiSuaUer.tenChuyenCongTac;
      dataSua.diaDiem = this.state.diaDiem
        ? this.state.diaDiem
        : this.state.hienThiSuaUer.diaDiem;
      dataSua.mucDichCongTac = this.state.mucDichCongTac
        ? this.state.mucDichCongTac
        : this.state.hienThiSuaUer.mucDichCongTac;
      dataSua.ngayBatDau = this.state.ngayBatDau
        ? this.state.ngayBatDau
        : moment(this.state.hienThiSuaUer.ngayBatDau).format("YYYY-MM-DD");
      dataSua.ngayKetThuc = this.state.ngayKetThuc
        ? this.state.ngayKetThuc
        : moment(this.state.hienThiSuaUer.ngayKetThuc).format("YYYY-MM-DD");
      dataSua.moTa = this.state.moTa
        ? this.state.moTa
        : this.state.hienThiSuaUer.moTa;

      this.setState({ dataSua: dataSua });

      this.state.data.forEach((value) => {
        if (value.maChuyenCongTac === dataSua.maChuyenCongTac) {
          value.tenChuyenCongTac = dataSua.tenChuyenCongTac;
          value.diaDiem = dataSua.diaDiem;
          value.mucDichCongTac = dataSua.mucDichCongTac;
          value.ngayBatDau = dataSua.ngayBatDau;
          value.ngayKetThuc = dataSua.ngayKetThuc;
          value.moTa = dataSua.moTa;
        }
      });

      axios({
        method: "PUT",
        url: "https://localhost:5001/api/ChuyenCongTac",
        data: {
          maChuyenCongTac: this.state.hienThiSuaUer.maChuyenCongTac,
          tenChuyenCongTac: this.state.tenChuyenCongTac
            ? this.state.tenChuyenCongTac
            : this.state.hienThiSuaUer.tenChuyenCongTac,
          diaDiem: this.state.diaDiem
            ? this.state.diaDiem
            : this.state.hienThiSuaUer.diaDiem,
          mucDichCongTac: this.state.mucDichCongTac
            ? this.state.mucDichCongTac
            : this.state.hienThiSuaUer.mucDichCongTac,
          ngayBatDau: this.state.ngayBatDau
            ? this.state.ngayBatDau
            : moment(this.state.hienThiSuaUer.ngayBatDau).format("YYYY-MM-DD"),
          ngayKetThuc: this.state.ngayKetThuc
            ? this.state.ngayKetThuc
            : moment(this.state.hienThiSuaUer.ngayKetThuc).format("YYYY-MM-DD"),
          moTa: this.state.moTa
            ? this.state.moTa
            : this.state.hienThiSuaUer.moTa,
          trangThai: "",
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.data)
        .then((res) => this.props.alertOn_TrangThaiSuaThanhCong(res))
        .catch((err) => {
          this.props.alertOn_TrangThaiSuaThatBai(err);
        });
    }
  };
  onDelete = (maChuyenCongTac) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa")) {
      // console.log(maPhongBan);
      var tempData = this.state.data.filter(
        (item) => item.maChuyenCongTac !== maChuyenCongTac
      );
      this.setState({ data: tempData });
      axios({
        method: "DELETE",
        url:
          "https://localhost:5001/api/ChuyenCongTac?MaChuyenCongTac=" +
          maChuyenCongTac,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.data)
        .then((res) => this.props.alertOn_TrangThaiXoaThanhCong(res))
        .catch((err) => this.props.alertOn_TrangThaiXoaThatBai(err));
    }
  };
  onDeleteNhanVienCongTac = (maNhanVien) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa")) {
      var tempData = this.state.dataNhanVienCongTac.filter(
        (item) => item.maNhanVien !== maNhanVien
      );
      this.setState({ dataNhanVienCongTac: tempData });
      axios({
        method: "DELETE",
        url: "https://localhost:5001/api/NhanVien/" + maNhanVien,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.data)
        .then((res) => this.props.alertOn_TrangThaiXoaThanhCong(res))
        .catch((err) => this.props.alertOn_TrangThaiXoaThatBai(err));
    }
  };
  layMaChuyenCongTac = (valueMaChuyenCongTac, value) => {
    this.setState({ layMaChuyenCongTac: valueMaChuyenCongTac });
    this.setState({ layDataChiTiet: value });
  };

  dataPurpose = () => {
    const data = [
      "Kí kết hợp đồng",
      "Tìm kiếm cơ hội hợp tác",
      "Học tập",
      "Công tác, trao đổi nghiệp vụ trong thành phố Hà Nội",
      "Công tác, trao đổi nghiệp vụ ngoài thành phố Hà Nội",
      "Công tác, trao đổi nghiệp vụ ở nước ngoài",
    ];
    return data.map((value, key) => (
      <option selected={value === this.state.hienThiSuaUer?.mucDichCongTac}>
        {value}
      </option>
    ));
  };

  printData = () => {
    console.log(this.state.data);
    var { data, searchItem } = this.state;
    var dataSearch = [];
    var layMaChuyenCongTac = [];
    data.forEach((item) => {
      if (
        (item.maChuyenCongTac &&
          item.maChuyenCongTac.toLowerCase().indexOf(searchItem) !== -1) ||
        (item.tenChuyenCongTac &&
          item.tenChuyenCongTac.toLowerCase().indexOf(searchItem) !== -1) ||
        (item.ngayBatDau &&
          item.ngayBatDau.toLowerCase().indexOf(searchItem) !== -1) ||
        (item.ngayKetThuc &&
          item.ngayKetThuc.toLowerCase().indexOf(searchItem) !== -1) ||
        (item.diaDiem &&
          item.diaDiem.toLowerCase().indexOf(searchItem) !== -1) ||
        (item.mucDichCongTac &&
          item.mucDichCongTac.toLowerCase().indexOf(searchItem) !== -1) ||
        (item.moTa && item.moTa.toLowerCase().indexOf(searchItem) !== -1)
      ) {
        dataSearch.push(item);
        layMaChuyenCongTac.push(item.maChuyenCongTac);
      }
    });
    var getDataNhanVienCongTac = [];
    this.state.dataNhanVienCongTac.forEach((item) => {
      if (item.maChuyenCongTac === this.state.layMaChuyenCongTac)
        getDataNhanVienCongTac.push(item);
    });
    return dataSearch.map((value, key) => (
      <tr className="tr__canGiua">
        {/* <td>đã thực hiện</td> */}
        <td>{key + 1}</td>
        <td>{value.maChuyenCongTac}</td>
        <td>{value.tenChuyenCongTac}</td>
        <td>{value.ngayBatDau}</td>
        <td>{value.ngayKetThuc}</td>
        <td>{value.diaDiem}</td>
        <td>{value.mucDichCongTac}</td>
        <td>{value.moTa}</td>
        <td>
          <a
            href=""
            data-toggle="modal"
            data-target="#chiTiet"
            onClick={() =>
              this.layMaChuyenCongTac(value.maChuyenCongTac, value)
            }
          >
            Chi tiết
          </a>
        </td>
        <td>{value.trangThai}</td>
        {/* begin Form chi tiet */}
        <div
          className="modal fade"
          id="chiTiet"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalScrollableTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-cct modal-dialog-scrollable"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalScrollableTitle">
                  Chi tiết
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                {/* begin chi tiet */}
                <div className="card text-center">
                  <div className="card-header">
                    <h4 className="disabled">Chi tiết</h4>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <div className="form-group">
                        {/* begin row thông tin chuyến công tác */}
                        <div className="row">
                          <div className="col-6">
                            <p style={{ textAlign: "left" }}>
                              Mã chuyến công tác
                            </p>
                            <input
                              type="text"
                              className="form-control"
                              name
                              id
                              aria-describedby="helpId"
                              value={this.state.layDataChiTiet.maChuyenCongTac}
                              disabled
                            />

                            <p style={{ textAlign: "left" }}>
                              Tên chuyến công tác
                            </p>
                            <input
                              type="text"
                              className="form-control"
                              name
                              id
                              aria-describedby="helpId"
                              value={this.state.layDataChiTiet.tenChuyenCongTac}
                              disabled
                            />
                            <p style={{ textAlign: "left" }}>Địa điểm</p>
                            <input
                              type="text"
                              className="form-control"
                              name
                              id
                              aria-describedby="helpId"
                              value={this.state.layDataChiTiet.diaDiem}
                              disabled
                            />
                          </div>
                          <div className="col-6">
                            <p style={{ textAlign: "left" }}>
                              Thời gian bắt đầu
                            </p>
                            <input
                              type="text"
                              className="form-control"
                              name
                              id
                              aria-describedby="helpId"
                              value={this.state.layDataChiTiet.ngayBatDau}
                              disabled
                            />
                            <p style={{ textAlign: "left" }}>
                              Thời gian kết thúc
                            </p>
                            <input
                              type="text"
                              className="form-control"
                              name
                              id
                              aria-describedby="helpId"
                              value={this.state.layDataChiTiet.ngayKetThuc}
                              disabled
                            />
                            <p style={{ textAlign: "left" }}>Mô tả</p>
                            <input
                              type="text"
                              className="form-control"
                              name
                              id
                              aria-describedby="helpId"
                              value={this.state.layDataChiTiet.moTa}
                              disabled
                            />
                          </div>
                        </div>
                        {/* end row thông tin chuyến công tác */}
                        <h4>Danh sách nhân viên công tác</h4>
                        {/* begin row thông tin nhân viên công tác */}
                        <div className="row">
                          <div className="col">
                            <table className="table table-striped table-hover">
                              <thead>
                                <tr className="tr__canGiua">
                                  <th>STT</th>
                                  <th>Tên chuyến CT</th>
                                  <th>Tên nhân viên</th>
                                  {this.state.layDataChiTiet.trangThai ===
                                    "Chua thuc hien" && <th>Thao tác</th>}
                                </tr>
                              </thead>
                              <tbody>
                                {getDataNhanVienCongTac.map((value, key) => (
                                  <tr className="tr__canGiua">
                                    {/* <td>đã thực hiện</td> */}
                                    <td>{key + 1}</td>
                                    <td>{value.maNhanVien}</td>
                                    <td>{value.tenNhanVien}</td>
                                    {this.state.layDataChiTiet.trangThai ===
                                      "Chua thuc hien" && (
                                      <td>
                                        <div className="btn btn-danger btn-group ml-2 w-100">
                                          <div
                                            className="fa fa-edit"
                                            onClick={() =>
                                              this.onDeleteNhanVienCongTac(
                                                value.maNhanVien
                                              )
                                            }
                                          >
                                            {" "}
                                            Xóa
                                          </div>
                                        </div>
                                      </td>
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/* end row thông tin chuyến công tác */}

                        {/* <p style={{ textAlign: 'left' }}>Trạng thái</p> */}
                        {/* <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="Trạng thái" name="trangThai" /> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* end chi tiet */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* end Form chi tiet */}

        {this.hienThiBtnSua_Xoa(value)}
      </tr>
    ));
  };
  hienThiBtnThemMoi = () => {
    if (
      this.state.dataUsers.roleID === "RL01" ||
      this.state.dataUsers.roleID === "RL05" ||
      this.state.dataUsers.roleID === "RL04"
    ) {
      return (
        <div
          className="btn btn-primary themmoi "
          data-toggle="modal"
          data-target="#themMoi"
        >
          Thêm mới
        </div>
      );
    }
  };
  hienThiBtnSua_Xoa = (value) => {
    if (
      this.state.dataUsers.roleID === "RL01" ||
      this.state.dataUsers.roleID === "RL05" ||
      this.state.dataUsers.roleID === "RL04"
    ) {
      return (
        <td>
          {/* begin Form sửa */}
          <div
            className="modal fade"
            id="sua"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalScrollableTitle"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-cct modal-dialog-scrollable"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalScrollableTitle">
                    Sửa
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  {/* begin sua */}
                  <div className="card text-center">
                    <div className="card-header">
                      <h4 className="disabled">Sửa</h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-6">
                              <p style={{ textAlign: "left" }}>
                                Tên chuyến công tác
                              </p>
                              <input
                                type="text"
                                className="form-control"
                                id
                                aria-describedby="helpId"
                                placeholder="Tên chuyến công tác"
                                name="tenChuyenCongTac"
                                defaultValue={
                                  this.state.hienThiSuaUer.tenChuyenCongTac
                                }
                                onChange={(value) => this.onChange(value)}
                              />
                              <p style={{ textAlign: "left" }}>Địa điểm</p>
                              <input
                                type="text"
                                className="form-control"
                                id
                                placeholder="Địa điểm"
                                name="diaDiem"
                                defaultValue={this.state.hienThiSuaUer.diaDiem}
                                onChange={(value) => this.onChange(value)}
                              />{" "}
                              <p style={{ textAlign: "left" }}>Mục đích</p>
                              <select
                                class="form-select form-control"
                                aria-label="Default select example"
                                name="mucDichCongTac"
                                onChange={(event) => this.onChange(event)}
                              >
                                <option selected>Chọn mục đích</option>
                                {this.dataPurpose()}
                              </select>
                            </div>
                            <div className="col-6">
                              <p style={{ textAlign: "left" }}>
                                Thời gian bắt đầu
                              </p>

                              <input
                                type="date"
                                className="form-control"
                                id="datetimepicker1"
                                placeholder="Thời gian bắt đầu"
                                name="ngayBatDau"
                                value={
                                  this.state.ngayBatDau
                                    ? this.state.ngayBatDau
                                    : moment(
                                        new Date(
                                          this.state.hienThiSuaUer.ngayBatDau
                                        )
                                      ).format("YYYY-MM-DD")
                                }
                                onChange={(value) => this.onChange(value)}
                              />

                              <p style={{ textAlign: "left" }}>
                                Thời gian kết thúc
                              </p>
                              <input
                                type="date"
                                className="form-control"
                                id="datetimepicker2"
                                aria-describedby="helpId"
                                placeholder="Thời gian kết thúc"
                                name="ngayKetThuc"
                                value={
                                  this.state.ngayKetThuc
                                    ? this.state.ngayKetThuc
                                    : moment(
                                        new Date(
                                          this.state.hienThiSuaUer.ngayKetThuc
                                        )
                                      ).format("YYYY-MM-DD")
                                }
                                onChange={(value) => this.onChange(value)}
                              />
                              <p style={{ textAlign: "left" }}>Mô tả</p>
                              <input
                                type="text"
                                className="form-control"
                                id
                                aria-describedby="helpId"
                                placeholder="Mô tả"
                                name="moTa"
                                defaultValue={this.state.hienThiSuaUer.moTa}
                                onChange={(value) => this.onChange(value)}
                              />
                            </div>
                          </div>

                          {/* <p style={{ textAlign: 'left' }}>Tình trạng</p>
                                                <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="Tình Trạng" name="tinhTrang" /> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* end sua */}
                  {/* </div> */}

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Hủy
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={() => this.onSua()}
                    >
                      Sửa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end Form sửa */}
          {value.trangThai === "Chua thuc hien" ? (
            <>
              <span
                className="btn btn-warning btn-group fa fa-edit"
                data-toggle="modal"
                data-target="#sua"
                onClick={() => this.layDataSua(value)}
              >
                Sửa
              </span>
              <span
                className="btn btn-danger btn-group fas fa-ban ml-2"
                onClick={() => this.onDelete(value.maChuyenCongTac)}
              >
                Xóa
              </span>
            </>
          ) : null}
        </td>
      );
    }
  };
  hienThiThaoTac = () => {
    if (
      this.state.dataUsers.roleID === "RL01" ||
      this.state.dataUsers.roleID === "RL05" ||
      this.state.dataUsers.roleID === "RL04"
    ) {
      return <th style={{ minWidth: "180px" }}>Thao tác</th>;
    }
  };

  render() {
    return (
      <div>
        <Header></Header>
        <div class="row-container">
          <Nav></Nav>
          <div className="table-manager" style={{ padding: "0 25px 0 0" }}>
            <div className="heading-manager">
              <i></i> Quản lý chuyến công tác
            </div>
            <div className="">
              {/* begin search */}
              <div className="d-flex justify-content-between">
                <div className="form-group filter">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="fas fa-search"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search ..."
                      name="searchItem"
                      value={this.state.searchItem}
                      onChange={(event) => this.onChange(event)}
                    />
                  </div>
                </div>
                {/* end search */}
                {/* <div className="btn btn-primary themmoi " data-toggle="modal" data-target="#themMoi">Thêm mới</div> */}
                {this.hienThiBtnThemMoi()}
              </div>
              {/* begin Form thêm mới */}
              <div
                className="modal fade"
                id="themMoi"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-cct modal-dialog-scrollable"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        Thêm mới
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      {/* begin sua */}
                      <div className="card text-center">
                        <div className="card-header">
                          <h4 className="disabled">Thêm mới</h4>
                        </div>
                        <div className="card-body">
                          <div className="form-group">
                            <div className="form-group">
                              <div className="row">
                                <div className="col-6">
                                  {/* <p style={{ textAlign: 'left' }}>Mã chuyến công tác</p>
                                                                    <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="Mã chuyến công tác" name="maChuyenCongTac" onChange={(value) => this.onChange(value)} />
                                                                  */}
                                  <p style={{ textAlign: "left" }}>
                                    Tên chuyến công tác
                                  </p>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id
                                    aria-describedby="helpId"
                                    placeholder="Tên chuyến công tác"
                                    name="tenChuyenCongTac"
                                    onChange={(value) => this.onChange(value)}
                                  />
                                  <p style={{ textAlign: "left" }}>Địa điểm</p>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id
                                    aria-describedby="helpId"
                                    placeholder="Địa điểm"
                                    name="diaDiem"
                                    onChange={(value) => this.onChange(value)}
                                  />
                                  <p style={{ textAlign: "left" }}>Mục Đích</p>
                                  <select
                                    class="form-select form-control"
                                    aria-label="Default select example"
                                    name="mucDichCongTac"
                                    onChange={(event) => this.onChange(event)}
                                  >
                                    <option selected>Chọn mục đích</option>
                                    {this.dataPurpose()}
                                  </select>
                                </div>
                                <div className="col-6">
                                  <p style={{ textAlign: "left" }}>
                                    Thời gian bắt đầu
                                  </p>
                                  <input
                                    type="date"
                                    className="form-control"
                                    id
                                    aria-describedby="helpId"
                                    placeholder="Thời gian bắt đầu"
                                    name="ngayBatDau"
                                    onChange={(value) => this.onChange(value)}
                                  />
                                  <p style={{ textAlign: "left" }}>
                                    Thời gian kết thúc
                                  </p>
                                  <input
                                    type="date"
                                    className="form-control"
                                    id
                                    aria-describedby="helpId"
                                    placeholder="Thời gian kết thúc"
                                    name="ngayKetThuc"
                                    onChange={(value) => this.onChange(value)}
                                  />
                                  <p style={{ textAlign: "left" }}>Mô tả</p>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id
                                    aria-describedby="helpId"
                                    placeholder="Mô tả"
                                    name="moTa"
                                    onChange={(value) => this.onChange(value)}
                                  />
                                </div>
                              </div>

                              {/* <p style={{ textAlign: 'left' }}>Tình trạng</p>
                                                        <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="Tình Trạng" name="tinhTrang" /> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* end sua */}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => this.onThemMoi()}
                      >
                        Thêm mới
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* end Form thêm mới */}
            </div>
            <div
              className="row "
              style={{ width: "101%", height: "600px", overflow: "auto" }}
            >
              <div className="col">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr className="tr__canGiua">
                      <th>STT</th>
                      <th>Mã chuyến CT</th>
                      <th>Tên chuyến CT</th>
                      <th>Thời gian bắt đầu</th>
                      <th>Thời gian kết thúc</th>
                      <th>Địa điểm</th>
                      <th>Mục đích</th>
                      <th>Mô tả</th>
                      <th style={{ minWidth: "80px" }}>Chi tiết</th>
                      <th style={{ minWidth: "135px" }}>Trạng thái</th>
                      {/* <th>Thao tác</th> */}
                      {this.hienThiThaoTac()}
                    </tr>
                  </thead>
                  <tbody>{this.printData()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    alertReducer: state.alertReducer,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    alertOn_TrangThaiThemMoiThanhCong: () => {
      dispatch(actions.alertOn_TrangThaiThemMoiThanhCong());
    },
    alertOff_TrangThaiThemMoiThanhCong: () => {
      dispatch(actions.alertOff_TrangThaiThemMoiThanhCong());
    },
    alertOn_TrangThaiThemMoiThatBai: () => {
      dispatch(actions.alertOn_TrangThaiThemMoiThatBai());
    },
    alertOff_TrangThaiThemMoiThatBai: () => {
      dispatch(actions.alertOff_TrangThaiThemMoiThatBai());
    },

    alertOn_TrangThaiSuaThanhCong: () => {
      dispatch(actions.alertOn_TrangThaiSuaThanhCong());
    },
    alertOff_TrangThaiSuaThanhCong: () => {
      dispatch(actions.alertOff_TrangThaiSuaThanhCong());
    },
    alertOn_TrangThaiSuaThatBai: () => {
      dispatch(actions.alertOn_TrangThaiSuaThatBai());
    },
    alertOff_TrangThaiSuaThatBai: () => {
      dispatch(actions.alertOff_TrangThaiSuaThatBai());
    },

    alertOn_TrangThaiXoaThanhCong: () => {
      dispatch(actions.alertOn_TrangThaiXoaThanhCong());
    },
    alertOff_TrangThaiXoaThanhCong: () => {
      dispatch(actions.alertOff_TrangThaiXoaThanhCong());
    },
    alertOn_TrangThaiXoaThatBai: () => {
      dispatch(actions.alertOn_TrangThaiXoaThatBai());
    },
    alertOff_TrangThaiXoaThatBai: () => {
      dispatch(actions.alertOff_TrangThaiXoaThatBai());
    },

    alertOn_TrangThaiQuyenThanhCong: () => {
      dispatch(actions.alertOn_TrangThaiQuyenThanhCong());
    },
    alertOff_TrangThaiQuyenThanhCong: () => {
      dispatch(actions.alertOff_TrangThaiQuyenThanhCong());
    },
    alertOn_TrangThaiQuyenThatBai: () => {
      dispatch(actions.alertOn_TrangThaiQuyenThatBai());
    },
    alertOff_TrangThaiQuyenThatBai: () => {
      dispatch(actions.alertOff_TrangThaiQuyenThatBai());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuanLyChuyenCongTac);
