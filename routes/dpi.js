var express = require("express");
var router = express.Router();
var connection = require("../config/database.js");

const Model_Dpi = require('../model/model_dpi.js');


router.get('/', async function(req, res, next){
    let rows = await Model_Dpi.getAll();
    res.render ('dpi/index',{
        data : rows
    })
})
 
router.get('/create', function(req,res){
    res.render('dpi/create', {
        nama_dpi: '',
        luas_dpi : ''
    
    })
})

router.post ('/store', async function (req, res, next){
    try {
        let {nama_dpi} = req.body;
        let {luas_dpi} = req.body;
        let Data = {
            nama_dpi,
            luas_dpi
        }
        await Model_Alat.Store(Data);
        req.flash('success','berhasil menyimpan data');
        res.redirect('/dpi')
    } catch {
        req.flash('error','gagal menyimpan');
        res.redirect('/dpi')
    }

})


router.get('/edit/(:id)', async function (req, res, next){
    let id = req.params.id;
    let rows = await Model_Dpi.getId(id);
    res.render('dpi/edit',{
        id : rows[0].id_dpi,
        nama_dpi : rows[0].nama_dpi,
        luas_dpi : rows[0].luas_dpi

    })

})

router.post('/update/(:id)', function(req, res, next){
    try {
        let id = req.params.id;
        let {nama_dpi} = req.body;
        let {luas_dpi} = req.body;
        let data = {
            nama_alat : nama_alat,
            luas_dpi : luas_dpi,
        }
        connection.query('update dpi set ? where id_dpi =' + id,data, function(err){
            if (err){
                req.flash('error','gagal menyimpan');
            }else{
                req.flash('success','berhasil menyimpan data');
            }
            res.redirect('/dpi');
        } )
    } catch {
        req.flash('error','terjadi kesalahan di fungsi');
        res.render('/dpi');

    }
})


router.get('/delete/(:id)', async function(req, res, next){
    let id = req.params.id;
    await Model_Dpi.Delete(id);
    req.flash('success','berhasil menghapus');
    res.redirect('/dpi')
 })


module.exports = router;