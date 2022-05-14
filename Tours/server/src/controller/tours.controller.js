const Tours = require("../model/tours.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const { idTour, nombre, precio, descripcion, destino } = req.body;
    //Instancia
    const tour = new Tours({
        idTour,
        nombre,
        precio,
        descripcion,
        destino,
    });

    Tours.create(tour, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tour."
            });
        else {
            console.log(data);
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    console.log(req);
    console.log(res);
    Tours.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Tours."
            });
        }
        else {
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    Tours.findById(req.params.idTour, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Tour not found with id ${req.params.idTour}.`
                });
            } else {
                res.status(500).send({
                    message: "Error response Tour with id " + req.params.idTour
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    Tours.updateById(
        req.params.id,
        new Tours(req.body), (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Tour not found with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Tour with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Tours.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Tour Not found with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete tour with id " + req.params.id
                });
            }
        } else res.send({ message: `Tour was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Tours.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Tours."
            });
        else res.send({ message: `All Tour were deleted successfully!` });
    });
};