//CRUD Tours

const sql = require("./db.js");

//Constructor
const Tours = function (Tours) {
    this.idTour = Tours.idTour;
    this.nombre = Tours.nombre;
    this.precio = Tours.precio;
    this.descripcion = Tours.descripcion;
    this.destino = Tours.destino;
    this.ruta = Tours.ruta;
};

Tours.create = (newTours, result) => {
    sql.query("INSERT INTO tours SET ?", newTours, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newTours });
    });
};

Tours.findById = (idTour, result) => {
    sql.query(`SELECT * FROM tours WHERE idTour = ${idTour}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Tours.getAll = (result) => { //obtiene todos los tours
    let query = "SELECT * FROM tours";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Tours: ", res);
        result(null, res);
    });
};

Tours.updateById = (id, tour, result) => {
    sql.query("UPDATE tours SET nombre = ?, precio = ?, descripcion = ? WHERE id = ?",
        [tour.nombre, tour.precio, tour.descripcion, id],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {

                result({ kind: "not_found" }, null);
                return;
            }
            console.log("Tour updated: ", { id: id, ...tour });
            result(null, { id: id, ...tour });
        }
    );
};

Tours.remove = (id, result) => {
    sql.query("DELETE FROM tours WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // no se encuentra el libro con ese id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted tour with id: ", id);
        result(null, res);
    });
};

Tours.removeAll = result => {
    sql.query("DELETE FROM tours", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} tours`);
        result(null, res);
    });
};

module.exports = Tours;