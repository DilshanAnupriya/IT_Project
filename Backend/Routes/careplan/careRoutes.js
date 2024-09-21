const express = require('express');
const router = express.Router();
const Careplan = require("../../Controllers/careplan/careControllers");

router.get("/", Careplan.getAllCareplans);
router.post("/add", Careplan.addCareplan);
router.get("/:id", Careplan.getById);
router.put("/:id", Careplan.updateCareplan);
router.delete("/:id", Careplan.deleteCareplan);

module.exports = router;