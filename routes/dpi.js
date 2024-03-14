const express = require("express");
const router = express.Router();
const Model_Dpi = require("../model/model_dpi");

router.get("/", async (req, res, next) => {
  try {
    let rows = await Model_Dpi.getAll();
    res.render("dpi/index", { data: rows });
  } catch (error) {
    next(error);
  }
});

router.get('/create', function(req,res){
    res.render('dpi/create', {
        nama_dpi : '',
        luas_dpi  :''
    })
})

router.post("/store", async (req, res, next) => {
  try {
    const dpiData =  req.body;
    await Model_Dpi.Store(dpiData);
    req.flash("success", "Berhasil menyimpan data dpi");
    res.redirect("/dpi");
  } catch {
    req.flash('error','gagal menyimpan');
    res.redirect('/dpi')
  }
});

router.get("/edit/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    let rows = await Model_Dpi.getId(id);
    res.render("dpi/edit", {
      id: id,
      nama_dpi: rows[0].nama_dpi,
      luas_dpi: rows[0].luas_dpi,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const dpiData = req.body;
    await Model_Dpi.Update(id, dpiData);
    req.flash("success", "Berhasil menyimpan data dpi");
    res.redirect("/dpi");
  } catch (error) {
    req.flash("error", "Gagal menyimpan data dpi");
    res.redirect("/dpi");
  }
});

router.get("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Model_Dpi.Delete(id);
    req.flash("success", "Berhasil menghapus data dpi");
    res.redirect("/dpi");
  } catch (error) {
    req.flash("error", "Gagal menghapus data dpi");
    res.redirect("/dpi");
  }
});

module.exports = router;