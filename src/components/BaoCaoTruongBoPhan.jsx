import React, { Component } from 'react';
import axios from 'axios'
import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';
import { connect } from "react-redux";
import * as actions from './../actions/actions'
import ReactToPdf from 'react-to-pdf';
const ref = React.createRef();
const options = {
    orientation: 'landscape',
    // unit: 'in',
    // format: [1, 1]
};
class DuyetDeXuatThanhToan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trangThai: '',
            data: [],

            maDeXuat: '',
            tenNhanVienDeXuat: '',
            maChuyenCongTac: '',
            tenChuyenCongTac: '',
            thoiGianDeXuat: '',
            tongTien: '',
            searchItem: '',
            tinhTrang: '',

            dataNhanVien: [],
            dataChuyenCongtac: [],
            dataNhanVienCongTac: [],
            dataUsers: [],
            dataChiPhi: [],
            dataDinhMuc: [],
            dataDeXuat: [],
            getMaChuyenCongTac: '',
            layMaChuyenCongTac: [],
            layMaCTT: '',
            dataDuyet: [],
            lyDo: '',
            time: '',
        }
    }

    componentDidMount() {

        axios({
            method: 'get',
            url: 'https://localhost:5001/api/DuyetDeXuat',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ data: res.data });
        }).catch(err => this.props.alertOn_TrangThaiQuyenThatBai(err));

        axios({
            method: 'get',
            url: 'https://localhost:5001/api/NhanVien',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ dataNhanVien: res.data }
            );
        }).catch(err => {
            console.log(err);
        })

        axios({
            method: 'get',
            url: 'https://localhost:5001/api/NhanVienCongTac',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ dataNhanVienCongTac: res.data }
            );
        }).catch(err => {
            console.log(err);
        })
        axios({
            method: 'get',
            url: 'https://localhost:5001/api/Users',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        }).then(res => {
            this.setState({ dataUsers: res.data }
            );
        }).catch(err => {
            console.log(err);
        })
        axios({
            method: 'get',
            url: 'https://localhost:5001/api/DeXuatThanhToan/SoTienChiTieu?MaChuyenCongTac=' + this.state.layMaCTT,
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ dataDeXuat: res.data });
        }).catch(err => {
            console.log(err)
        })

    }
    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        console.log(name);
        console.log(value);
        this.setState({
            [name]: value
        });
    }
    tenNhanVienDeXuat = () => {

        return (
            <input type="text" className="form-control" name id aria-describedby="helpId" style={{ fontSize: "20px" }} placeholder={this.state.layTenNhanVienDeXuat} disabled />

        )

    }
    deXuat = () => {

        return (
            this.state.dataDeXuat.map((value, key) => (
                <tr className="tr__canGiua">
                    <td>{key + 1}</td>
                    <td>{value.tenChiPhi}</td>
                    <td>{value.soTienChiTieu}</td>

                </tr>
            )
            )
        )
    }
    layMaChuyenCongTac = (valueMaChuyenCongTac, valueTenNhanVienDeXuat) => {
        this.setState({ layMaChuyenCongTac: valueMaChuyenCongTac });
        this.setState({ layTenNhanVienDeXuat: valueTenNhanVienDeXuat });
        var getMaChuyenCongTacChiTiet = '';
        this.state.dataNhanVienCongTac.forEach((item) => {
            if (item.maChuyenCongTac === valueMaChuyenCongTac)
                getMaChuyenCongTacChiTiet = item.maChuyenCongTac
        })
        console.log(getMaChuyenCongTacChiTiet); // lay ra ma chuyen cong tac tuong ung voi chi tiet

        axios({
            method: 'get',
            url: 'https://localhost:5001/api/DeXuatThanhToan/DuyetDeXuat/SoTienChiTieu?MaChuyenCongTac=' + getMaChuyenCongTacChiTiet,
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ dataDeXuat: res.data });
        }).catch(err => {
            console.log(err)
        })
    }

    duyetDeXuat = (maDeXuat, value) => {
        axios({
            method: 'POST',
            url: 'https://localhost:5001/api/DuyetDeXuat/XetDuyet?MaDeXuat=' + maDeXuat,
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) => res.data)
            .then((res) => this.props.alertOn_TrangThaiDuyetThanhCong(res))
            .then(() => { window.location.reload() })
            .catch(err => this.props.alertOn_TrangThaiDuyetThatBai(err));

        console.log(this.state.data);

        // var dataDuyet = [];
        // dataDuyet.maDeXuat = value.maDeXuat //this.state.hienThiSuaUer.maPhongBan l?? data onChange nh???p v??o
        // dataDuyet.tenChuyenCongTac = value.tenChuyenCongTac;
        // dataDuyet.soNhanVien = value.soNhanVien;
        // dataDuyet.thoiGianDeXuat = value.thoiGianDeXuat;
        // dataDuyet.tongChiPhi = value.tongChiPhi;
        // dataDuyet.lyDo = value.lyDo;
        // dataDuyet.tinhTrang = value.tinhTrang;
        // console.log(dataDuyet);

        // // console.log(dataSua);
        // this.setState({ dataDuyet: dataDuyet });
        // this.state.data.forEach((value) => {
        //     if (value.maDeXuat === dataDuyet.maDeXuat) {
        //         value.tenChuyenCongTac = dataDuyet.tenChuyenCongTac;
        //         value.soNhanVien = dataDuyet.soNhanVien;
        //         value.thoiGianDeXuat = dataDuyet.thoiGianDeXuat;
        //         value.tongChiPhi = dataDuyet.tongChiPhi;
        //         value.lyDo = dataDuyet.lyDo;
        //         value.tinhTrang = dataDuyet.tinhTrang;
        //     }
        // })
    }
    layMaTuChoi = (maDeXuat) => {
        console.log(maDeXuat);
        this.setState({ layMaTuChoi: maDeXuat });
    }
    tuChoiDeXuat = () => {

        axios({
            method: 'POST',
            url: 'https://localhost:5001/api/DuyetDeXuat/TuChoi',
            data: {
                maDeXuat: this.state.layMaTuChoi,
                lyDo: this.state.lyDo
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) => res.data)
            .then((res) => this.props.alertOn_TrangThaiTuChoiDuyetThanhCong(res))
            .then(() => { window.location.reload() })
            .catch(err => this.props.alertOn_TrangThaiTuChoiDuyetThatBai(err));

        console.log(this.state.data);

    }
    onChangeChonThoiGian = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        // console.log(name);
        // console.log(value);
        this.setState({
            [name]: value
        });

        this.setState({ time: value });
        // var selectTime = [];

        // this.state.data.forEach((item) => {
        //     if (item.thoiGianDeXuat.indexOf(value) !== -1) {
        //         selectTime.push(item)
        //     }
        // })
        // console.log(selectTime)
        // console.log(this.state.data);
    }
    printData = () => {

        var { data, searchItem } = this.state;
        var dataSearch = [];
        var layMaChuyenCongTac = [];
        data.forEach((item) => {
            if (item.thoiGianDeXuat.toLowerCase().indexOf(searchItem) !== -1) {
                dataSearch.push(item)
                layMaChuyenCongTac.push(item.maChuyenCongTac)
            }
        })
        // console.log(layMaChuyenCongTac);
        var getDataNhanVienCongTac = [];
        this.state.dataNhanVienCongTac.forEach((item) => {
            if (item.maChuyenCongTac === this.state.layMaChuyenCongTac)
                getDataNhanVienCongTac.push(item)
        })
        // console.log(getDataNhanVienCongTac);
        // t??m ki???m theo select th???i gian
        var selectTime = [];
        this.state.data.forEach((item) => {
            if (item.ngayBatDau.indexOf(this.state.time) !== -1) {
                selectTime.push(item)
            }
        })
        return (
            selectTime.map((value, key) => (
                <tr className="tr__canGiua" >
                    {/* <td>???? th???c hi???n</td> */}
                    <td>{key + 1}</td>
                    <td>{value.maDeXuat}</td>
                    <td>{value.tenChuyenCongTac}</td>
                    <td>{value.tenNhanVien}</td>
                    <td>{value.soNhanVien}</td>
                    <td>{value.ngayBatDau}</td>
                    <td>{value.ngayKetThuc}</td>
                    <td>{value.tongChiPhi}</td>
                    <td><a href="" data-toggle="modal" data-target="#" data-toggle="modal" data-target="#chiTiet" onClick={() => this.layMaChuyenCongTac(value.maChuyenCongTac, value.tenNhanVien)}>Chi ti???t</a></td>

                    <td>{value.tinhTrang}</td>
                    <td>{value.lyDo}</td>
                    {/* begin Form chi tiet */}
                    <div className="modal fade" id="chiTiet" tabIndex={-1} role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                        <div className="modal-dialog modal-cct modal-dialog-scrollable" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalScrollableTitle">Chi ti???t</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">??</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {/* begin chi tiet */}
                                    <div className="card text-center">
                                        <div className="card-header">
                                            <h4 className="disabled">Chi ti???t</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <div className="form-group">
                                                    {/* begin row th??ng tin chuy???n c??ng t??c */}
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <p style={{ textAlign: 'left' }}>Nh??n vi??n ????? xu???t</p>
                                                            {this.tenNhanVienDeXuat()}

                                                        </div>
                                                        <div className="col-6">
                                                            {/* begin row th??ng tin nh??n vi??n c??ng t??c */}
                                                            <div className="row">
                                                                <div className="col">
                                                                    <table className="table table-striped table-hover">
                                                                        <thead>
                                                                            <tr className="tr__canGiua" >
                                                                                <th>Nh??n vi??n c??ng t??c</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                getDataNhanVienCongTac.map((value, key) => (
                                                                                    <tr className="tr__canGiua" >
                                                                                        <td>{value.tenNhanVien}</td>
                                                                                    </tr >
                                                                                )
                                                                                )
                                                                            }
                                                                        </tbody>
                                                                    </table>
                                                                </div>

                                                            </div>
                                                            {/* end row th??ng tin chuy???n c??ng t??c */}
                                                        </div>
                                                    </div>
                                                    {/* end row th??ng tin chuy???n c??ng t??c */}


                                                    <h4>Danh s??ch chi ph?? c??ng t??c</h4>
                                                    {/* begin DS chi ph?? c??ng t??c */}
                                                    <div className="row mt-3">
                                                        <div className="col">
                                                            <table className="table table-striped table-hover">
                                                                <thead>
                                                                    <tr className="tr__canGiua" >
                                                                        <th>STT</th>
                                                                        <th>T??n chi ph??</th>
                                                                        <th>S??? ti???n chi ti??u</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.deXuat()}
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                    </div>
                                                    {/* end DS chi ph?? c??ng t??c */}


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* end chi tiet */}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" data-dismiss="modal">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end Form chi tiet */}

                </tr >
            )
            )

        )

    }




    render() {
        console.log(this.state.dataUsers);
        return (

            <div>
                <Header></Header>
                <div class="row-container">
                    <Nav></Nav>
                    <div className="table-manager" style={{ padding: '0 25px 0 0' }}>
                        <h1 className="heading-manager">B??o c??o</h1>
                        <div className="d-flex justify-content-between" >
                            <div style={{ width: '20%' }}>
                                <select class="form-select form-control" aria-label="Default select example" name="chonThoiGian" onChange={(event) => this.onChangeChonThoiGian(event)} >
                                    <option selected>Ch???n th???i gian</option>
                                    <option>2021</option>
                                    <option>2020</option>
                                    <option>2019</option>
                                    <option>2018</option>
                                    <option>2017</option>
                                </select>
                            </div>
                            {/* <div className="form-group ">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" >
                                            <i class="fas fa-search"></i>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Search ..." name="searchItem" value={this.state.searchItem} onChange={(event) => this.onChange(event)} />
                                </div>
                            </div> */}
                            {/* end search */}
                            <ReactToPdf targetRef={ref} filename="baocao.pdf" options={options} x={0.5} y={0.5} scale={0.7}>
                                {({ toPdf }) => (
                                    // <button onClick={toPdf}>Generate pdf</button>
                                    <div className="btn btn-primary themmoi " onClick={toPdf}>Xu???t file PDF</div>
                                )}
                            </ReactToPdf>
                        </div>
                        <div className="row mt-3" style={{ width: "101%", height: "600px", overflow: "auto" }} ref={ref}>
                            <div className="col "  >
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr className="tr__canGiua" >
                                            <th>STT</th>
                                            <th>M?? ????? xu???t</th>
                                            <th>T??n CCT</th>
                                            <th>Nh??n vi??n ????? xu???t</th>
                                            <th>S??? nh??n vi??n</th>
                                            <th>Ng??y b???t ?????u</th>
                                            <th>Ng??y k???t th??c</th>

                                            <th>T???ng chi ph??</th>
                                            <th>Chi ti???t</th>
                                            <th>T??nh tr???ng</th>
                                            <th>L?? do</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.printData()}
                                    </tbody>
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
        alertReducer: state.alertReducer

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        alertOn_TrangThaiDuyetThanhCong: () => { dispatch(actions.alertOn_TrangThaiDuyetThanhCong()) },
        alertOff_TrangThaiDuyetThanhCong: () => { dispatch(actions.alertOff_TrangThaiDuyetThanhCong()) },
        alertOn_TrangThaiDuyetThatBai: () => { dispatch(actions.alertOn_TrangThaiDuyetThatBai()) },
        alertOff_TrangThaiDuyetThatBai: () => { dispatch(actions.alertOff_TrangThaiDuyetThatBai()) },

        alertOn_TrangThaiTuChoiDuyetThanhCong: () => { dispatch(actions.alertOn_TrangThaiTuChoiDuyetThanhCong()) },
        alertOff_TrangThaiTuChoiDuyetThanhCong: () => { dispatch(actions.alertOff_TrangThaiTuChoiDuyetThanhCong()) },
        alertOn_TrangThaiTuChoiDuyetThatBai: () => { dispatch(actions.alertOn_TrangThaiTuChoiDuyetThatBai()) },
        alertOff_TrangThaiTuChoiDuyetThatBai: () => { dispatch(actions.alertOff_TrangThaiTuChoiDuyetThatBai()) },

        alertOn_TrangThaiQuyenThanhCong: () => { dispatch(actions.alertOn_TrangThaiQuyenThanhCong()) },
        alertOff_TrangThaiQuyenThanhCong: () => { dispatch(actions.alertOff_TrangThaiQuyenThanhCong()) },
        alertOn_TrangThaiQuyenThatBai: () => { dispatch(actions.alertOn_TrangThaiQuyenThatBai()) },
        alertOff_TrangThaiQuyenThatBai: () => { dispatch(actions.alertOff_TrangThaiQuyenThatBai()) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DuyetDeXuatThanhToan)
