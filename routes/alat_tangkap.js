var express = require("express");
var router = express.Router();
var connection = require("../config/database.js");

const Model_Alat = require('../model/model_alat');


router.get('/', async function(req, res, next){
    let rows = await Model_Alat.getAll();
    res.render ('alat/index',{
        data : rows
    })
})
 
router.get('/create', function(req,res){
    res.render('alat/create', {
        nama: ''
    })
})

router.post ('/store', async function (req, res, next){
    try {
        let {nama_alat} = req.body;
        let Data = {
            nama_alat
        }
        await Model_Alat.Store(Data);
        req.flash('success','berhasil menyimpan data');
        res.redirect('/alat')
    } catch {
        req.flash('error','gagal menyimpan');
        res.redirect('/alat')
    }

})


router.get('/edit/(:id)', async function (req, res, next){
    let id = req.params.id;
    let rows = await Model_Alat.getId(id);
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
            res.redirect('/alat');
        } )
    } catch {
        req.flash('error','terjadi kesalahan di fungsi');
        res.render('/alat');

    }
})


router.get('/delete/(:id)', async function(req, res, next){
    let id = req.params.id;
    await Model_Alat.Delete(id);
    req.flash('success','berhasil menghapus');
    res.redirect('/alat')
 })


module.exports = router;