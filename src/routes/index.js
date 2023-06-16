const express = require('express');
const router = express.Router();
const accountRoute = require('./account.route');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const fieldRoute = require('./field.route');
const candidateRoute = require('./candidate.route');
const contactRoute = require('./contact.route');
const companyRoute = require('./company.route');
const jobRoute = require('./job.route');


router.use('/accounts', accountRoute);
router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/fields', fieldRoute);
router.use('/candidates', candidateRoute);
router.use('/companies', companyRoute);
router.use('/contacts', contactRoute);
router.use('/jobs', jobRoute);


module.exports = router;