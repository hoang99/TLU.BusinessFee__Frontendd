import React, { Component } from "react";
import axios from "axios";
import Nav from "./Nav";
import Header from "./Header";
import Footer from "./Footer";
import { connect } from "react-redux";
import * as actions from "./../actions/actions";

import {
  Document,
  Font,
  Image,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import myIcon from "../img/logo1.jpg";
import moment from "moment/moment";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    textAlign: "center",
    margin: 10,
  },
  textRight: {
    alignItems: "center",
  },
  textLeft: {
    marginRight: 100,
    alignItems: "center",
  },
  image: {
    marginTop: 10,
    width: 100,
    height: 100,
    textAlign: "center",
  },

  textCenter: {
    textAlign: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    marginTop: 20,
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "10%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  colWidth: {
    width: "5%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
  footer: {
    position: "relative",
  },
  date: {
    position: "absolute",
    fontSize: 10,
    right: 0,
    padding: "10px 20px",
  },
  approval: {
    left: 0,
    fontSize: 10,
    position: "absolute",
    padding: "10px 20px",
  },
  createdReport: {
    padding: "10px 20px",
  },
});
class DuyetDeXuatThanhToan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trangThai: "",
      data: [],

      maDeXuat: "",
      tenNhanVienDeXuat: "",
      maChuyenCongTac: "",
      tenChuyenCongTac: "",
      thoiGianDeXuat: "",
      tongTien: "",
      searchItem: "",
      tinhTrang: "",

      dataNhanVien: [],
      dataChuyenCongtac: [],
      dataNhanVienCongTac: [],
      dataUsers: [],
      dataChiPhi: [],
      dataDinhMuc: [],
      dataDeXuat: [],
      getMaChuyenCongTac: "",
      layMaChuyenCongTac: [],
      layMaCTT: "",
      dataDuyet: [],
      lyDo: "",
    };
  }
  myDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.textLeft}>
            <Text style={{ fontSize: 13, fontWeight: "bold" }}>
              CÔNG TY CỔ PHẦN TECHASIANS
            </Text>
            {/* <Text style={{ fontSize: 13, fontWeight: "bold" }}>
              Trường đại học Kinh tế quốc dân
            </Text> */}
            <Image style={styles.image} src={myIcon} />
          </View>
          <View style={styles.textRight}>
            <Text style={{ fontSize: 13, fontWeight: "bold" }}>
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Độc lập - Tự do - Hạnh phúc
            </Text>
          </View>
        </View>
        <Text style={styles.textCenter}>Báo cáo thống kê</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.colWidth}>
              <Text style={styles.tableCell}>STT</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Mã đề xuất</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Tên CTT</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Mục đích</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Nhân viên DX</Text>
            </View>
            <View style={styles.colWidth}>
              <Text style={styles.tableCell}>Số NV</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Ngày bắt đầu</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Ngày kết thúc</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Tổng chi phí</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Tình trạng</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Lý do</Text>
            </View>
          </View>
          {this.state.data.map((value, key) => {
            return (
              <View style={styles.tableRow}>
                <View style={styles.colWidth}>
                  <Text style={styles.tableCell}>{key + 1}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{value.maDeXuat} </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{value.tenChuyenCongTac}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{value.mucDichCongTac}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{value.tenNhanVien}</Text>
                </View>
                <View style={styles.colWidth}>
                  <Text style={styles.tableCell}>{value.soNhanVien}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{value.ngayBatDau}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{value.ngayKetThuc}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {value.tongChiPhi.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{value.tinhTrang}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{value.lyDo}</Text>
                </View>
              </View>
            );
          })}
          <View style={styles.tableRow}>
            <View style={styles.colWidth}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Tổng chi phí</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.colWidth}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {this.state.data
                  .reduce((sum, value) => (sum += value.tongChiPhi), 0)
                  .toLocaleString()}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.date}>
            <Text>{`Ngày ${new Date().getDate()}, tháng ${
              new Date().getMonth() + 1
            }, năm ${new Date().getFullYear()}`}</Text>
            <Text style={styles.createdReport}>Người tạo báo cáo</Text>
          </View>
          <View style={styles.approval}>
            <Text>Người phê duyệt</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
  componentDidMount() {
    axios({
      method: "get",
      url: "https://localhost:5001/api/DuyetDeXuat",
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
    axios({
      method: "get",
      url:
        "https://localhost:5001/api/DeXuatThanhToan/SoTienChiTieu?MaChuyenCongTac=" +
        this.state.layMaCTT,
      data: null,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({ dataDeXuat: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  onChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  tenNhanVienDeXuat = () => {
    return (
      <input
        type="text"
        className="form-control"
        name
        id
        aria-describedby="helpId"
        style={{ fontSize: "20px" }}
        placeholder={this.state.layTenNhanVienDeXuat}
        disabled
      />
    );
  };
  deXuat = () => {
    return this.state.dataDeXuat.map((value, key) => (
      <tr className="tr__canGiua">
        <td>{key + 1}</td>
        <td>{value.tenChiPhi}</td>
        <td>{value.soTienChiTieu}</td>
      </tr>
    ));
  };
  layMaChuyenCongTac = (valueMaChuyenCongTac, valueTenNhanVienDeXuat) => {
    this.setState({ layMaChuyenCongTac: valueMaChuyenCongTac });
    this.setState({ layTenNhanVienDeXuat: valueTenNhanVienDeXuat });
    var getMaChuyenCongTacChiTiet = "";
    this.state.dataNhanVienCongTac.forEach((item) => {
      if (item.maChuyenCongTac === valueMaChuyenCongTac)
        getMaChuyenCongTacChiTiet = item.maChuyenCongTac;
    });

    axios({
      method: "get",
      url:
        "https://localhost:5001/api/DeXuatThanhToan/DuyetDeXuat/SoTienChiTieu?MaChuyenCongTac=" +
        getMaChuyenCongTacChiTiet,
      data: null,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({ dataDeXuat: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  duyetDeXuat = (maDeXuat, value) => {
    axios({
      method: "POST",
      url:
        "https://localhost:5001/api/DuyetDeXuat/XetDuyet?MaDeXuat=" + maDeXuat,
      data: null,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.data)
      .then((res) => this.props.alertOn_TrangThaiDuyetThanhCong(res))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => this.props.alertOn_TrangThaiDuyetThatBai(err));
  };
  layMaTuChoi = (maDeXuat) => {
    this.setState({ layMaTuChoi: maDeXuat });
  };
  tuChoiDeXuat = () => {
    axios({
      method: "POST",
      url: "https://localhost:5001/api/DuyetDeXuat/TuChoi",
      data: {
        maDeXuat: this.state.layMaTuChoi,
        lyDo: this.state.lyDo,
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.data)
      .then((res) => this.props.alertOn_TrangThaiTuChoiDuyetThanhCong(res))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => this.props.alertOn_TrangThaiTuChoiDuyetThatBai(err));
  };

  printData = () => {
    var { data, searchItem } = this.state;
    var dataSearch = [];
    var layMaChuyenCongTac = [];
    data.forEach((item) => {
      if (
        (item.maDeXuat &&
          item.maDeXuat.toLowerCase().indexOf(searchItem) !== -1) ||
        (item.tenChuyenCongTac &&
          item.tenChuyenCongTac.toLowerCase().indexOf(searchItem) !== -1) ||
        (item.mucDichCongTac &&
          item.mucDichCongTac.toLowerCase().indexOf(searchItem) !== -1) ||
        (item.tenNhanVien &&
          item.tenNhanVien.toLowerCase().indexOf(searchItem) !== -1) ||
        (item.ngayBatDau &&
          moment(item.ngayBatDau)
            .format("YYYY")
            .toString()
            .indexOf(searchItem) !== -1) ||
        (item.ngayKetThuc &&
          moment(item.ngayKetThuc)
            .format("YYYY")
            .toString()
            .indexOf(searchItem) !== -1) ||
        (item.tongChiPhi &&
          item.tongChiPhi.toString().toLowerCase().indexOf(searchItem) !==
            -1) ||
        (item.tinhTrang &&
          item.tinhTrang.toLowerCase().indexOf(searchItem) !== -1) ||
        (item.lyDo && item.lyDo.toLowerCase().indexOf(searchItem) !== -1)
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
    // tìm kiếm theo select thời gian

    return dataSearch.map((value, key) => (
      <tr className="tr__canGiua">
        {/* <td>đã thực hiện</td> */}
        <td>{key + 1}</td>
        <td>{value.maDeXuat}</td>
        <td>{value.tenChuyenCongTac}</td>
        <td>{value.mucDichCongTac}</td>
        <td>{value.tenNhanVien}</td>
        <td>{value.soNhanVien}</td>
        <td>{value.ngayBatDau}</td>
        <td>{value.ngayKetThuc}</td>
        <td>{value.tongChiPhi}</td>
        <td>
          <a
            href=""
            data-toggle="modal"
            data-target="#chiTiet"
            onClick={() =>
              this.layMaChuyenCongTac(value.maChuyenCongTac, value.tenNhanVien)
            }
          >
            Chi tiết
          </a>
        </td>

        <td>{value.tinhTrang}</td>
        <td>{value.lyDo}</td>
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
                              Nhân viên đề xuất
                            </p>
                            {this.tenNhanVienDeXuat()}
                          </div>
                          <div className="col-6">
                            {/* begin row thông tin nhân viên công tác */}
                            <div className="row">
                              <div className="col">
                                <table className="table table-striped table-hover">
                                  <thead>
                                    <tr className="tr__canGiua">
                                      <th>Nhân viên công tác</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {getDataNhanVienCongTac.map(
                                      (value, key) => (
                                        <tr className="tr__canGiua">
                                          <td>{value.tenNhanVien}</td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            {/* end row thông tin chuyến công tác */}
                          </div>
                        </div>
                        {/* end row thông tin chuyến công tác */}

                        <h4>Danh sách chi phí công tác</h4>
                        {/* begin DS chi phí công tác */}
                        <div className="row mt-3">
                          <div className="col">
                            <table className="table table-striped table-hover">
                              <thead>
                                <tr className="tr__canGiua">
                                  <th>STT</th>
                                  <th>Tên chi phí</th>
                                  <th>Số tiền chi tiêu</th>
                                </tr>
                              </thead>
                              <tbody>{this.deXuat()}</tbody>
                            </table>
                          </div>
                        </div>
                        {/* end DS chi phí công tác */}
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
      </tr>
    ));
  };

  render() {
    return (
      <div>
        <Header></Header>
        <div class="row-container">
          <Nav></Nav>
          <div className="table-manager" style={{ padding: "0 25px 0 0" }}>
            <div className="heading-manager">
              <i></i> Báo cáo
            </div>
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
              <div
                style={{
                  marginRight: 44,
                  marginTop: 8,
                }}
              >
                <button className="btn btn-primary  ">
                  <PDFDownloadLink
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: 16,
                    }}
                    document={this.myDocument()}
                    fileName="report.pdf"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? "Loading ..." : "Export PDF"
                    }
                  </PDFDownloadLink>
                </button>
              </div>
            </div>
            <div
              className="row mt-3"
              style={{ width: "101%", height: "600px", overflow: "auto" }}
            >
              <div className="col ">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr className="tr__canGiua">
                      <th>STT</th>
                      <th>Mã đề xuất</th>
                      <th>Tên CCT</th>
                      <th>Mục đích</th>
                      <th>Nhân viên đề xuất</th>
                      <th>Số nhân viên</th>
                      <th>Ngày bắt đầu</th>
                      <th>Ngày kết thúc</th>

                      <th>Tổng chi phí</th>
                      <th>Chi tiết</th>
                      <th>Tình trạng</th>
                      <th>Lý do</th>
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
    alertOn_TrangThaiDuyetThanhCong: () => {
      dispatch(actions.alertOn_TrangThaiDuyetThanhCong());
    },
    alertOff_TrangThaiDuyetThanhCong: () => {
      dispatch(actions.alertOff_TrangThaiDuyetThanhCong());
    },
    alertOn_TrangThaiDuyetThatBai: () => {
      dispatch(actions.alertOn_TrangThaiDuyetThatBai());
    },
    alertOff_TrangThaiDuyetThatBai: () => {
      dispatch(actions.alertOff_TrangThaiDuyetThatBai());
    },

    alertOn_TrangThaiTuChoiDuyetThanhCong: () => {
      dispatch(actions.alertOn_TrangThaiTuChoiDuyetThanhCong());
    },
    alertOff_TrangThaiTuChoiDuyetThanhCong: () => {
      dispatch(actions.alertOff_TrangThaiTuChoiDuyetThanhCong());
    },
    alertOn_TrangThaiTuChoiDuyetThatBai: () => {
      dispatch(actions.alertOn_TrangThaiTuChoiDuyetThatBai());
    },
    alertOff_TrangThaiTuChoiDuyetThatBai: () => {
      dispatch(actions.alertOff_TrangThaiTuChoiDuyetThatBai());
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
)(DuyetDeXuatThanhToan);
