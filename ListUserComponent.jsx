import React, { Component } from 'react';
import UserService from '../services/UserService';
import { Link } from 'react-router-dom';

class ListUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };

        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(id) {
        UserService.deleteUser(id).then((res) => {
            this.setState({
                users: this.state.users.filter((user) => user.id !== id),
            });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Users List</h2>
                <div className="row">
                    <Link to="/add-user/_add" className="btn btn-primary">
                        Add User
                    </Link>
                </div>
                <br />
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Nama Barang</th>
                                <th>Jumlah</th>
                                <th>Harga Satuan</th>
                                <th>Lokasi</th>
                                <th>Deskripsi</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.nama_barang}</td>
                                    <td>{user.jumlah}</td>
                                    <td>{user.harga_satuan}</td>
                                    <td>{user.lokasi}</td>
                                    <td>{user.deskripsi}</td>
                                    <td>
                                        <Link to={`/add-user/${user.id}`} className="btn btn-info">
                                            Update
                                        </Link>
                                        <button
                                            style={{ marginLeft: '10px' }}
                                            onClick={() => this.deleteUser(user.id)}
                                            className="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                        <Link to={`/view-user/${user.id}`} style={{ marginLeft: '10px' }} className="btn btn-info">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListUserComponent;
