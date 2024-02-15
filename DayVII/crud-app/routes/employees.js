var express = require('express');
var router = express.Router();

const empCtrl = require('../controllers/employees-controller');

router.get('/', empCtrl.index);
router.get('/details', empCtrl.details);
router.get('/details/:empid', empCtrl.details);
router.get('/create', empCtrl.create_get);
router.post('/create', empCtrl.create_post);
router.get('/edit/:empid', empCtrl.edit_get);
router.post('/edit/:empid', empCtrl.edit_post);
router.get('/delete/:empid', empCtrl.delete_get);
router.post('/delete/:empid', empCtrl.delete_post);

module.exports = router;
