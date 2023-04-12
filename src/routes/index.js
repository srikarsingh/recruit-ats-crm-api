const express = require('express');
const config = require('../config/config');

const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
// if (config.env === 'development') {
//   router.use('/docs', docsRoute);
// }

module.exports = router;