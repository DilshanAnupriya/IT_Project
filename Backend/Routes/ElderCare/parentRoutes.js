const express = require('express');
const { submitForm, getAllParents, updateParent, deleteParent, getUserParentsById } = require('../../Controllers/ElderCare/parentController');

const router = express.Router();

// Parent Routes
router.post('/', submitForm);
router.get('/', getAllParents);
router.put('/:id', updateParent);
router.delete('/:id', deleteParent);
router.get('/user', getAllParents);

module.exports = router;
