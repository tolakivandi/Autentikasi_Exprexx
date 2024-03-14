var express = require("express");
var router = express.Router();
var connection = require("../config/database.js");

const Model_Pemilik = require('../model/model_pemilik');


router.get('/', async function(req, res, next){
    let rows = await Model_Pemilik.getAll();
    res.render ('pemilik/index',{
        data : rows
    })
})
 
router.get('/create', function(req,res){
    res.render('pemilik/create', {
        nama_pemilik: '',
        alamat : '',
        nomer_hp : ''
    })
})

router.post ('/store', async function (req, res, next){
    try {
        let {nama_alat} = req.body;
        let Data = {
            nama_alat
        }
        await Model_Pemilik.Store(Data);
        req.flash('success','berhasil menyimpan data');
        res.redirect('/alat_tangkap')
    } catch {
        req.flash('error','gagal menyimpan');
        res.redirect('/alat_tangkap')
    }

})


router.get('/edit/(:id)', async function (req, res, next){
    let id = req.params.id;
    let rows = await Model_Pemilik.getId(id);
    res.render('alat/edit',{
        id : rows[0].id_alat,
        nama_alat : rows[0].nama_alat
    })

})

router.post('/update/(:id)', function(req, res, next){
    try {
        let id = req.params.id;
        let {nama_alat} = req.body;
        let data = {
            nama_alat : nama_alat
        }
        connection.query('update alat_tangkap set ? where id_alat =' + id,data, function(err){
            if (err){
                req.flash('error','gagal menyimpan');
            }else{
                req.flash('success','berhasil menyimpan data');
            }
            res.redirect('/alat_tangkap');
        } )
    } catch {
        req.flash('error','terjadi kesalahan di fungsi');
        res.render('/alat_tangkap');

    }
})


router.get('/delete/(:id)', async function(req, res, next){
    let id = req.params.id;
    await Model_Pemilik.Delete(id);
    req.flash('success','berhasil menghapus');
    res.redirect('/alat_tangkap')
 })


module.exports = router;