// disini akan dituliskan kode logic untuk mengolah data dari database
const siswa = require('../models/siswa')

module.exports = {
    home: (req, res) => {
        res.send({
            message: "Selamat datang di halaman API"
        })
    },
    getAll: (req, res) => {
        try {
            // jika data tersedia
            if (siswa.length > 0) {
                res.send({
                    message: "Get all Data",
                    status: 200,
                    data: siswa
                })
            } else {
                //jika data tersedia tapi kosong
                res.send({
                    message: "Data masih kosong",
                    status: 200,
                    data: siswa
                })
            }
        }
        // jika try tidak bisa, berarti kesalah dari server
        catch (error) {
            res.send({
                message: "Internal Server Error",
                status: 500,
            })
        }
    },
    getOne: (req, res) => {
        try {
            // buat variabel untuk menarik / menangkap ID menggunakan method filter
            // req.params adalah input yang digunakan di bagian url
            const data = siswa.filter(user => user.id == req.params.id)
            // jika siswa dengan ID yg sama dengan parameter ditemukan
            if (data.length > 0) {
                res.send({
                    message: "Get One Siswa",
                    status: 200,
                    data: data
                })
            } else {
                // jika ID tidak ditemukan
                res.send({
                    message: `Data dengan ID : ${req.params.id} tidak ditemukan`,
                    status: 404
                })
            }
        }
        catch (error) {
            res.send({
                message: `Internal Server Error`,
                status: 500
            })
        }
    },
    register: (req, res) => {
        try {
            // kita akan cek si siswa yg daftar, namanya sudah ada apa belum
            let registeredUser = siswa.filter(user => user.name == req.body.name)
            // jika belum terdaftar/ method filter kita mereturn 0 / []
            if (registeredUser.length == 0) {
                // kita buat 1 objek baru dari hasil input form
                let newSiswa = {
                    id: siswa.length + 1,
                    name: req.body.name,
                    age: req.body.age
                }
                // jika form sudah diisi maka push object baru kedalam array siswa
                siswa.push(newSiswa)
                res.send({
                    message: "Pendaftaran berhasil",
                    status: 201,
                    data: newSiswa
                })
            } else {
                res.send({
                    message: `Siswa dengan nama ${req.body.name} sudah terdaftar`,
                    status: 400
                })
            }
        }
        catch (error) {
            res.send({
                message: "Internal Server Error, Please try again",
                status: 500
            })
        }
    },
    edit: (req, res) => {
        try {
            // menangkap ID yang ingin di edit, menggunakan method findIndex
            // misal findIndex berhasil, dia akan mereturn index, jika gagal dia mereturn -1
            let updateById = siswa.findIndex(user => user.id == req.params.id)
            siswa.map(data => {
                if (data.id == req.params.id) {
                    siswa[updateById].name = req.body.name == null || "" ? data.name : req.body.name;
                    siswa[updateById].age = req.body.age == null || "" ? data.age : req.body.age;
                }
            })
            res.send({
                message: `Siswa dengan ID ${req.params.id} berhasil di update`,
                status: 201
            })

        }
        catch (error) {
            res.send({
                message: `Internal Server Error, please try again`,
                status: 500
            })
        }
    },
    remove: (req, res) => {
        try {
            let deleteById = siswa.findIndex(user => user.id == req.params.id);
            siswa.splice(deleteById, 1);
            res.send({
                message: `Data berhasil dihapus`,
                status: 200
            })
        }
        catch (err) {
            res.send({
                message: `Internal Server Error, please try again`,
                status: 500
            })
        }
    }

}
