import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "../css/App.css";
// import Nav from './Nav';
import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import Home from "../components/Home";
import BaoCaoLanhDao from "./BaoCaoLanhDao";
import BaoCaoNhanVien from "./BaoCaoNhanVien";
import BaoCaoTruongBoPhan from "./BaoCaoTruongBoPhan";
import DuyetDeXuatThanhToan from "./DuyetDeXuatThanhToan";
import Login from "./Login";
import NhanVienCongTac from "./NhanVienCongTac";
import QuanLyCapBac from "./QuanLyCapBac";
import QuanLyChiPhi from "./QuanLyChiPhi";
import QuanLyChuyenCongTac from "./QuanLyChuyenCongTac";
import QuanLyDeXuatThanhToan from "./QuanLyDeXuatThanhToan";
import QuanLyDinhMuc from "./QuanLyDinhMuc";
import QuanLyNhanVien from "./QuanLyNhanVien";
import QuanLyPhongBan from "./QuanLyPhongBan";
import QuanLyThanhToan from "./QuanLyThanhToan";

import AlertComponents from "./AlertComponents";
class App extends Component {
  // git pull origin master
  // ->git push origin master
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }
  onLogin = () => {
    alert("ok");
  };

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
        this.setState({ isLogin: true });
      })
      .catch((err) => {
        this.setState({ isLogin: false });
      });
  }

  render() {
    return (
      <Router>
        <div>
          {/* <Header></Header> */}
          <div>
            <AlertComponents></AlertComponents>
            <Switch>
              <Route
                path="/login"
                render={() => {
                  return this.state.isLogin ? (
                    <Redirect to="/home" />
                  ) : (
                    <Login />
                  );
                }}
              ></Route>
              <Route
                exact
                path="/"
                render={() => {
                  return this.state.isLogin ? (
                    <Redirect to="/home" />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              ></Route>
              <Route
                exact
                path="/home"
                render={() => {
                  return this.state.isLogin ? (
                    <Home />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              ></Route>
              <Route
                path="/quanlyphongban"
                render={() => {
                  return this.state.isLogin ? (
                    <QuanLyPhongBan />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              ></Route>
              {/* <Route path="/test">
                            <Test></Test>
                        </Route> */}
              <Route
                path="/quanlynhanvien"
                render={() => {
                  return this.state.isLogin ? (
                    <QuanLyNhanVien />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              ></Route>

              <Route
                path="/quanlycapbac"
                render={() => {
                  return this.state.isLogin ? (
                    <QuanLyCapBac />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              ></Route>
              <Route
                path="/quanlychiphi"
                render={() => {
                  return this.state.isLogin ? (
                    <QuanLyChiPhi />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              ></Route>
              <Route
                path="/quanlydinhmuc"
                render={() => {
                  return this.state.isLogin ? (
                    <QuanLyDinhMuc />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              ></Route>
              <Route
                path="/quanlychuyencongtac"
                render={() => {
                  return this.state.isLogin ? (
                    <QuanLyChuyenCongTac />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              ></Route>
              <Route
                path="/quanlydexuatthanhtoan"
                render={() => {
                  return this.state.isLogin ? (
                    <QuanLyDeXuatThanhToan />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              ></Route>
              <Route
                path="/duyetdexuatthanhtoan"
                render={() => {
                  return this.state.isLogin ? (
                    <DuyetDeXuatThanhToan />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              ></Route>
              <Route
                path="/quanlythanhtoan"
                render={() => {
                  return this.state.isLogin ? (
                    <QuanLyThanhToan />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              ></Route>
              <Route
                path="/nhanviencongtac"
                render={() => {
                  return this.state.isLogin ? (
                    <NhanVienCongTac />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              ></Route>
              <Route
                path="/baocaonhanvien"
                render={() => {
                  return this.state.isLogin ? (
                    <BaoCaoNhanVien />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              ></Route>
              <Route
                path="/baocaotruongbophan"
                render={() => {
                  return this.state.isLogin ? (
                    <BaoCaoTruongBoPhan />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              ></Route>
              <Route
                path="/baocaolanhdao"
                render={() => {
                  return this.state.isLogin ? (
                    <BaoCaoLanhDao />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              ></Route>
            </Switch>
          </div>
          {/* <Footer></Footer> */}
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    alertReducer: state.alertReducer,
  };
};
export default connect(mapStateToProps)(App);
