import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/UserService";

class CreateUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: (props.match && props.match.params.id) || "_add",
      nama_barang: "",
      jumlah: "",
      harga_satuan: "",
      lokasi: "",
      deskripsi: "",
    };

    this.changeNamaBarang = this.changeNamaBarang.bind(this);
    this.changeJumlah = this.changeJumlah.bind(this);
    this.changeHargaSatuan = this.changeHargaSatuan.bind(this);
    this.changeLokasi = this.changeLokasi.bind(this);
    this.changeDeskripsi = this.changeDeskripsi.bind(this);
    this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;

    if (match && match.params) {
      const userId = match.params.id || "_add";

      if (userId !== "_add") {
        UserService.getUserById(userId)
          .then((res) => {
            let user = res.data;
            if (user) {
              this.setState({
                nama_barang: user.nama_barang,
                jumlah: user.jumlah,
                harga_satuan: user.harga_satuan,
                lokasi: user.lokasi,
                deskripsi: user.deskripsi,
              });
            }
          })
          .catch((error) => {
            console.error("Error fetching user:", error);
          });
      }
    }
  }

  saveOrUpdateUser(e) {
    e.preventDefault();
    let user = {
      nama_barang: this.state.nama_barang,
      jumlah: this.state.jumlah,
      harga_satuan: this.state.harga_satuan,
      lokasi: this.state.lokasi,
      deskripsi: this.state.deskripsi,
    };

    if (this.state.id === "_add") {
      UserService.createUser(user)
        .then((res) => {
          this.props.history.push("/users");
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    } else {
      UserService.updateUser(user, this.state.id)
        .then((res) => {
          this.props.history.push("/users");
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
  }

  changeNamaBarang(event) {
    this.setState({ nama_barang: event.target.value });
  }

  changeJumlah(event) {
    this.setState({ jumlah: event.target.value });
  }

  changeHargaSatuan(event) {
    this.setState({ harga_satuan: event.target.value });
  }

  changeLokasi(event) {
    this.setState({ lokasi: event.target.value });
  }

  changeDeskripsi(event) {
    this.setState({ deskripsi: event.target.value });
  }

  render() {
    return (
      <div>
        <br />
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Nama Barang: </label>
                    <input
                      key="nama_barang"
                      placeholder="Nama Barang"
                      name="nama_barang"
                      className="form-control"
                      value={this.state.nama_barang}
                      onChange={this.changeNamaBarang}
                    />
                  </div>
                  <div className="form-group">
                    <label> Jumlah: </label>
                    <input
                      type="number"
                      key="jumlah"
                      placeholder="Jumlah"
                      name="jumlah"
                      className="form-control"
                      value={this.state.jumlah}
                      onChange={this.changeJumlah}
                    />
                  </div>
                  <div className="form-group">
                    <label> Harga Satuan: </label>
                    <input
                      key="harga_satuan"
                      type="text"
                      placeholder="Harga Satuan"
                      name="harga_satuan"
                      className="form-control"
                      value={this.state.harga_satuan}
                      onChange={this.changeHargaSatuan}
                    />
                  </div>
                  <div className="form-group">
                    <label> Lokasi: </label>
                    <select
                      name="lokasi"
                      className="form-control"
                      value={this.state.lokasi}
                      onChange={this.changeLokasi}
                    >
                      <option value="Bandung">Bandung</option>
                      <option value="Bogor">Bogor</option>
                      <option value="Garut">Garut</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label> Deskripsi: </label>
                    <input
                      key="deskripsi"
                      placeholder="Deskripsi"
                      name="deskripsi"
                      className="form-control"
                      value={this.state.deskripsi}
                      onChange={this.changeDeskripsi}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateUser}
                  >
                    Save
                  </button>
                  <Link
                    to="/users"
                    className="btn btn-danger"
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getTitle() {
    return this.state.id === "_add" ? (
      <h3 className="text-center">Add Inventory</h3>
    ) : (
      <h3 className="text-center">Update User</h3>
    );
  }
}

export default CreateUserComponent;
