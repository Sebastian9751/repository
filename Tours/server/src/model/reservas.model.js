const sql = require("./db.js");
const helpers = require('../lib/email.js');

//Constructor
const Reservas = function (reserva) {
    this.nombre_titular = reserva.nombre_titular;
    this.correo_electronico = reserva.correo_electronico;
    this.telefono = reserva.telefono;
    this.personas = reserva.personas;
    this.precio = reserva.precio;
    this.fecha_inicio = reserva.fecha_inicio;
    this.fecha_fin = reserva.fecha_fin;
    this.idTour = reserva.idTour;
};

Reservas.create = (newReserva, result) => {
    /**
     * Consulta los datos del tour al que se esta haciendo la reserva y 
     * poder calcular el precio total del tour, mediante el numero de 
     * personas y el precio del tour.
     * Hace la insercion a la base de datos.
     */
    sql.query(`SELECT * FROM tours WHERE idTour = ${newReserva.idTour}`, (err, response) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        newReserva.precio = response[0].precio * newReserva.personas;

        sql.query("INSERT INTO reservas SET ? ", newReserva, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            newReserva.idTour = response[0];
            helpers.sendEmail(newReserva);
            result(null, { id: res.insertId, ...newReserva });
        });
    });
};

Reservas.findById = (id, result) => {
    sql.query(`SELECT * FROM reservas WHERE idReserva = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            /**
             * Añade los datos del tour a la reserva
             */
            sql.query(`SELECT * FROM tours WHERE idTour = ${res[0].idTour}`, (err, response) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
                res[0].idTour = response[0];
                //console.log("Reservas: ", res);
                result(null, res[0]);
            });
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Reservas.getAll = (result) => {
    /**
     * Obtiene todas las reservas y los datos del tour
     * al que pertenece.
     */
    let query = `SELECT 
    reservas.idReserva,
    reservas.nombre_titular,
    reservas.correo_electronico,
    reservas.telefono,
    reservas.personas,
    reservas.precio,
    reservas.fecha_inicio,
    reservas.fecha_fin,
    tours.idTour,
    tours.nombre AS nombre_tour,
    tours.precio AS precio_tour,
    tours.descripcion AS descripcion_Tour
    FROM 
    reservas INNER JOIN tours 
    ON 
    reservas.idtour = tours.idtour`;
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log("Reservas: ", res);
        result(null, res);
    });
};

Reservas.updateById = (id, reserva, result) => {
    sql.query(`SELECT * FROM tours WHERE idTour = ${reserva.idTour}`, (err, response) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        newReserva.precio = response[0].precio * newReserva.personas;

        sql.query("UPDATE reservas SET ? WHERE idReserva = ?", [reserva, id], (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
    
                result({ kind: "not_found" }, null);
                return;
            }
            /**
             * Añade los datos del tour, perteneciente a la reserva
             */
            sql.query(`SELECT * FROM tours WHERE idTour = ${reserva.idTour}`, (err, resp) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
                reserva.idTour = resp[0];
                console.log("Reserva updated: ", { id: id, ...reserva });
                result(null, { id: id, ...reserva });
            });
        });
    });
};

Reservas.remove = (id, result) => {
    sql.query("DELETE FROM reservas WHERE idReserva = ?", id, (err, res) => {
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
        console.log("Deleted reserva with id: ", id);
        result(null, res);
    });
};

Reservas.removeAll = result => {
    sql.query("DELETE FROM reservas", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} reservas`);
        result(null, res);
    });
};

module.exports = Reservas;