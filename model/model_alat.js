const connection = require('../config/database');


class Model_Alat {

    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM alat_tangkap ORDER BY id_alat DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

static async Store(Data) {
    return new Promise((resolve, reject) =>{
        connection.query('insert into alat_tangkap set ? ', Data, function(err, result){
            if (err){
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

static async getId(id){
    return new Promise ((resolve, reject) => {
        connection.query('select * from alat_tangkap where id_alat =' + id, (err,rows) => {
            if (err) {
                reject (err);
            }else {
                resolve(rows);
            }
        });
    });
}

static async Update (id,Data) {
    return new Promise((resolve, reject) =>{
        connection.query('update alat_tangkap set ? where id_alat =' + id, Data, function(err, result){
            if (err) {
                reject(err);
            }else {
                resolve(result);
            }
        } );
    } );
}

static async Delete (id) {
    return new Promise((resolve, reject) => {
        connection.query('delete from alat_tangkap where id_alat =' + id, function(err,result){
            if (err){
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}


}






module.exports = Model_Alat;