const reservas = require("../controller/reservas.controller.js");

var router = require("express").Router();

router.post("/", reservas.create);

router.get("/", reservas.findAll);

router.get("/:id", reservas.findOne);

router.put("/:id", reservas.update);

router.delete("/:id", reservas.delete);

router.delete("/", reservas.deleteAll);

module.exports = router;