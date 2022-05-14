const Reservas = require("../model/reservas.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const { nombre_titular, correo_electronico, telefono, personas, precio, fecha_inicio, fecha_fin, idTour } = req.body;

    const reserva = new Reservas({
        nombre_titular,
        correo_electronico,
        telefono,
        personas,
        precio,
        fecha_inicio,
        fecha_fin,
        idTour
    });

    Reservas.create(reserva, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Reserva."
            });
        }
        else {
            console.log(data);
            res.send(data);
        }
    })
};

exports.findOne = (req, res) => {
    Reservas.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Reserva not found with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error response Reserva with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Reservas.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Reserva."
            });
        }
        else {
            console.log("--------------DATA-----------------");
            console.log(data);
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    Reservas.updateById(req.params.id, new Reservas(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Reserva not found with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating reserva with id " + req.params.id
                });
            }
        } else res.send(data);
    }
    );
};

exports.delete = (req, res) => {
    Reservas.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Reserva Not found with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete reserva with id " + req.params.id
                });
            }
        } else res.send({ message: `Reserva was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Reservas.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Reserva."
            });
        else res.send({ message: `All Reserva were deleted successfully!` });
    });
};