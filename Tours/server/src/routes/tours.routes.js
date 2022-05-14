const tours = require("../controller/tours.controller.js");

var router = require("express").Router();

router.post("/", tours.create);

router.get("/", tours.findAll);

router.get("/:idTour", tours.findOne);

router.put("/:idTour", tours.update);

router.delete("/:idTour", tours.delete);

router.delete("/", tours.deleteAll);

module.exports = router;