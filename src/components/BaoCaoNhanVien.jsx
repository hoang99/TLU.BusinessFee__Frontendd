import React, { Component } from "react";
import axios from "axios";
import Nav from "./Nav";
import Header from "./Header";
import Footer from "./Footer";
import { connect } from "react-redux";
import * as actions from "./../actions/actions";
import moment from "moment/moment";
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
    width: "11.25%",
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

class BaoCaoNhanVien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trangThai: "",
      data: [],
      dataSua: [],
      maDeXuat: "",
      tenNhanVienDeXuat: "",
      maChuyenCongTac: "",
      tenChuyenCongTac: "",
      thoiGianDeXuat: "",
      tongTien: "",
      searchItem: "",
      tinhTrang: "",
      hienThiSuaUer: [],
      dataNhanVien: [],
      dataChuyenCongtac: [],
      dataNhanVienCongTac: [],
      dataUsers: [],
      dataChiPhi: [],
      dataDinhMuc: [],
      dataDeXuat: [],
      getMaChuyenCongTac: "",
      file: null,
      lyDo: "",
      time: "",
    };
  }
  myDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.textLeft}>
            <Text style={{ fontSize: 13, fontWeight: "bold" }}>
              BỘ GIÁO DỤC VÀ ĐÀO TẠO
            </Text>
            <Text style={{ fontSize: 13, fontWeight: "bold" }}>
              Trường đại học Kinh tế quốc dân
            </Text>
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
  onChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  onChangeFile = (event) => {
    var file = event.target.files[0];
    this.setState({ file: file });
  };
  onChangeSoNhanVien = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name]: value,
    });
    this.setState({ getOnChangeSoNhanVien: value });
    var getMaChuyenCongTac = "";
    this.state.dataChuyenCongtac.map((item) => {
      if (value == item.tenChuyenCongTac) {
        getMaChuyenCongTac = item.maChuyenCongTac;
      }
    });
    this.setState({ getMaChuyenCongTac: getMaChuyenCongTac });
    axios({
      method: "get",
      url:
        "https://localhost:5001/api/DeXuatThanhToan/SoTienChiTieu?MaChuyenCongTac=" +
        getMaChuyenCongTac,
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

  onChangeChiPhi = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name]: name,
    });
    this.setState({ getOnChangeChiPhi: value });
  };

  componentDidMount() {
    axios({
      method: "get",
      url: "https://localhost:5001/api/DeXuatThanhToan",
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
      url: "https://localhost:5001/api/ChuyenCongTac",
      data: null,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({ dataChuyenCongtac: res.data });
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
      url: "https://localhost:5001/api/ChiPhi",
      data: null,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({ dataChiPhi: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    axios({
      method: "get",
      url: "https://localhost:5001/api/DinhMuc",
      data: null,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        this.setState({ dataDinhMuc: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  themMoiDeXuat = () => {
    // begin dinh muc
    var maCapBacCuaNhanVienCongTac = [];
    this.state.dataNhanVienCongTac.forEach((item) => {
      if (item.tenChuyenCongTac == this.state.getOnChangeSoNhanVien) {
        maCapBacCuaNhanVienCongTac.push(item.maCapBac);
      }
    });
    var layTenChiPhiTrongBangDinhMuc = [];
    this.state.dataDinhMuc.forEach((item) => {
      maCapBacCuaNhanVienCongTac.map((value) => {
        if (item.maCapBac === value) {
          layTenChiPhiTrongBangDinhMuc.push(item);
        }
      });
    });
    var dinhMuc = [];
    layTenChiPhiTrongBangDinhMuc.forEach((item) => {
      if (item.tenChiPhi == this.state.getOnChangeChiPhi) {
        dinhMuc.push(item.soTienDinhMuc);
      }
    });

    let DINHMUC = 0;
    for (let i = 0; i < dinhMuc.length; i++) {
      DINHMUC += dinhMuc[i] * 1;
    }
    // end dinh muc
    var maChiPhi = [];
    this.state.dataChiPhi.map((value) => {
      if (this.state.getOnChangeChiPhi === value.tenChiPhi) {
        maChiPhi = value.maChiPhi;
      }
    });
    var item = {};
    // item.maChuyenCongTac = this.state.getMaChuyenCongTac;
    item.tenChiPhi = this.state.getOnChangeChiPhi;
    if (this.state.soTienChiTieu <= DINHMUC) {
      item.soTienChiTieu = this.state.soTienChiTieu * 1;
    } else {
      item.soTienChiTieu = DINHMUC;
      alert("Số tiền chi tiêu phải nhỏ hơn hoặc bằng định mức");
    }

    item.tongThanhToan = 0;
    var items = this.state.dataDeXuat;
    items.push(item);
    this.setState({ dataDeXuat: items });
    axios({
      method: "POST",
      url: "https://localhost:5001/api/DeXuatThanhToan/ChiPhiThanhToan",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        maChuyenCongTac: this.state.getMaChuyenCongTac,
        maChiPhi: maChiPhi,
        soTienChiTieu: item.soTienChiTieu * 1,
        tongThanhToan: 0,
      },
    })
      .then((res) => res.data)
      .then((res) => this.props.alertOn_TrangThaiThemMoiThanhCong(res))
      .catch((err) => this.props.alertOn_TrangThaiThemMoiThatBai(err));
  };
  themMoiDeXuatThanhToan = () => {
    var tongTien = [];
    this.state.dataDeXuat.map((value) => {
      tongTien.push(value.soTienChiTieu);
    });
    let TONGTIEN = 0;
    for (let i = 0; i < tongTien.length; i++) {
      TONGTIEN += tongTien[i];
    }
    var soNhanVien = [];
    this.state.dataNhanVienCongTac.forEach((item) => {
      if (item.tenChuyenCongTac == this.state.getOnChangeSoNhanVien) {
        soNhanVien.push(item.maNhanVien);
      }
    });
    var tenNhanVienDeXuat = "";
    this.state.dataNhanVien.map((value, key) => {
      if (this.state.dataUsers === value.maNhanVien) {
        tenNhanVienDeXuat = value.tenNhanVien;
      }
    });
    var item = {};
    item.maDeXuat = this.state.maDeXuat;
    item.tenChuyenCongTac = this.state.tenChuyenCongTac;
    item.tenNhanVien = tenNhanVienDeXuat;
    item.thoiGianDeXuat = this.state.thoiGianDeXuat;
    item.soNhanVien = soNhanVien.length;
    item.tongTien = TONGTIEN;
    item.fileHoaDon = this.state.file;
    // soNhanVien

    var items = this.state.data;
    items.push(item);
    this.setState({ data: items });
    var { file } = this.state;
    var fileHoaDon = new FormData();
    fileHoaDon.append("img", file);

    axios({
      method: "POST",
      url: "https://localhost:5001/api/DeXuatThanhToan",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        maDeXuat: this.state.maDeXuat,
        maChuyenCongTac: this.state.getMaChuyenCongTac,
        nhanVienDeXuat: this.state.dataUsers,
        thoiGianDeXuat: this.state.thoiGianDeXuat,
        tongTien: TONGTIEN,
        fileHoaDon,
      },
    })
      .then((res) => res.data)
      .then((res) => this.props.alertOn_TrangThaiThemMoiThanhCong(res))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => this.props.alertOn_TrangThaiThemMoiThatBai(err));
  };
  hienThiTenChuyenCongTac = () => {
    return this.state.dataChuyenCongtac.map((value, key) => (
      <option>{value.tenChuyenCongTac}</option>
    ));
  };
  tenNhanVienDeXuat = () => {
    var tenNhanVienDeXuat = "";
    this.state.dataNhanVien.map((value, key) => {
      if (this.state.dataUsers === value.maNhanVien) {
        tenNhanVienDeXuat = value.tenNhanVien;
      }
    });
    return (
      <input
        type="text"
        className="form-control"
        name
        id
        aria-describedby="helpId"
        placeholder={tenNhanVienDeXuat}
        disabled
      />
    );
  };
  // thoiGianDeXuat = () => {
  //     var today = new Date();
  //     var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

  //     return (
  //         <input type="text" className="form-control" name id aria-describedby="helpId" value={date} name="thoiGianDeXuat" onChange={(value) => this.onChange(value)} />

  //     )
  // }

  soNhanVien = () => {
    var soNhanVien = [];
    this.state.dataNhanVienCongTac.forEach((item) => {
      if (item.tenChuyenCongTac == this.state.getOnChangeSoNhanVien) {
        soNhanVien.push(item.maNhanVien);
      }
    });

    return (
      <input
        type="text"
        className="form-control"
        id
        aria-describedby="helpId"
        value={soNhanVien.length}
        name="soNhanVien"
        onChange={(value) => this.onChange(value)}
      />
    );
  };
  hienThiTenChiPhi = () => {
    return this.state.dataChiPhi.map((value, key) => (
      <option>{value.tenChiPhi}</option>
    ));
  };
  hienThiDonVi = () => {
    var donVi = [];
    this.state.dataDinhMuc.forEach((item) => {
      if (item.tenChiPhi == this.state.getOnChangeChiPhi) {
        donVi.push(item.donVi);
      }
    });
    var DONVI = [];
    for (var i = 0; i < donVi.length; i++) {
      DONVI = donVi[1];
    }

    return (
      <input
        type="text"
        className="form-control"
        id
        aria-describedby="helpId"
        value={DONVI}
        name="donVi"
        disabled
      />
    );
  };
  // begin thuat toan
  DINHMUC = () => {
    var maCapBacCuaNhanVienCongTac = [];
    this.state.dataNhanVienCongTac.forEach((item) => {
      if (item.tenChuyenCongTac == this.state.getOnChangeSoNhanVien) {
        maCapBacCuaNhanVienCongTac.push(item.maCapBac);
      }
    });
    var layTenChiPhiTrongBangDinhMuc = [];
    this.state.dataDinhMuc.forEach((item) => {
      maCapBacCuaNhanVienCongTac.map((value) => {
        if (item.maCapBac === value) {
          layTenChiPhiTrongBangDinhMuc.push(item);
        }
      });
    });
    var dinhMuc = [];
    layTenChiPhiTrongBangDinhMuc.forEach((item) => {
      if (item.tenChiPhi == this.state.getOnChangeChiPhi) {
        dinhMuc.push(item.soTienDinhMuc);
      }
    });
    let DINHMUC = 0;
    for (let i = 0; i < dinhMuc.length; i++) {
      DINHMUC += dinhMuc[i] * 1;
    }
    return (
      <input
        type="text"
        className="form-control"
        name
        id
        aria-describedby="helpId"
        value={DINHMUC}
        disabled
      />
    );
  };

  printData = () => {
    var { data, searchItem } = this.state;
    var dataSearch = [];
    data.forEach((item) => {
      if (
        (item.maDeXuat &&
          item.maDeXuat.toLowerCase().indexOf(searchItem) !== -1) ||
        (item.tenChuyenCongTac &&
          item.tenChuyenCongTac.toLowerCase().indexOf(searchItem) !== -1) ||
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
      }
    });

    return dataSearch.map((value, key) => (
      <tr className="tr__canGiua">
        <td>{key + 1}</td>
        <td>{value.tenChuyenCongTac}</td>
        <td>{value.soNhanVien}</td>
        <td>{value.ngayBatDau}</td>
        <td>{value.ngayKetThuc}</td>
        <td>{value.tongTien}</td>
        <td>
          <a href="" data-toggle="modal" data-target="#chiTiet">
            Chi tiết
          </a>
        </td>
        <td>{value.tinhTrang}</td>
        <td>{value.lydo}</td>
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
                                    {/* {
                                                                                getDataNhanVienCongTac.map((value, key) => (
                                                                                    <tr className="tr__canGiua" >
                                                                                        <td>{value.tenNhanVien}</td>
                                                                                    </tr >
                                                                                )
                                                                                )
                                                                            } */}
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
  onDeleteDeXuatThanhToan = (maDeXuat) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa")) {
      // console.log(maPhongBan);
      var tempData = this.state.data.filter(
        (item) => item.maDeXuat !== maDeXuat
      );
      this.setState({ data: tempData });
      axios({
        method: "DELETE",
        url: "https://localhost:5001/api/DeXuatThanhToan?MaDeXuat=" + maDeXuat,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.data)
        .then((res) => this.props.alertOn_TrangThaiXoaThanhCong(res))
        .catch((err) => this.props.alertOn_TrangThaiXoaThatBai(err));
    }
  };
  deXuat = () => {
    return this.state.dataDeXuat.map((value, key) => (
      <tr className="tr__canGiua">
        <td>{key + 1}</td>
        <td>{value.tenChiPhi}</td>
        <td>{value.soTienChiTieu}</td>
        <td>
          <div
            className="btn btn-danger btn-group ml-2"
            style={{ fontSize: "22px" }}
          >
            <div
              className="fa fa-edit"
              onClick={() =>
                this.onDeleteDeXuat(value.maChuyenCongTac, value.maChiPhi)
              }
            >
              {" "}
              Xóa
            </div>
          </div>
        </td>
      </tr>
    ));
  };
  onDeleteDeXuat = (maChuyenCongTac, maChiPhi) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa")) {
      var tempData = this.state.dataDeXuat.filter(
        (item) =>
          item.maChuyenCongTac !== maChuyenCongTac || item.maChiPhi !== maChiPhi
      );
      this.setState({ dataDeXuat: tempData });
      axios({
        method: "DELETE",
        url:
          "https://localhost:5001/api/DeXuatThanhToan/ChiPhiCongTac?MaChuyenCongTac=" +
          maChuyenCongTac +
          "&MaChiPhi=" +
          maChiPhi,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.data)
        .then((res) => this.props.alertOn_TrangThaiXoaThanhCong(res))
        .catch((err) => this.props.alertOn_TrangThaiXoaThatBai(err));
    }
  };
  tongChiPhi = () => {
    var tongTien = [];
    this.state.dataDeXuat.map((value) => {
      tongTien.push(value.soTienChiTieu);
    });
    let TONGTIEN = 0;
    for (let i = 0; i < tongTien.length; i++) {
      TONGTIEN += tongTien[i];
    }

    return (
      <input
        type="text"
        className="form-control"
        name
        id
        aria-describedby="helpId"
        value={TONGTIEN}
        disabled
      />
    );
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
            </div>

            <div
              className="row mt-3"
              style={{ width: "101%", height: "600px", overflow: "auto" }}
            >
              <div className="col">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr className="tr__canGiua">
                      <th>STT</th>

                      <th>Tên CCT</th>
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
export default connect(mapStateToProps, mapDispatchToProps)(BaoCaoNhanVien);
