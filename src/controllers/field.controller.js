const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { fieldService } = require('../services');

const createFields = async (req, res) => {
    const field = await fieldService.createField(req.body)
    res.status(httpStatus.CREATED).send(field);
}

const getFields = async (req, res) => {
    const filter = pick(req.query, ['function', 'section']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await fieldService.queryFields(filter, options);
    res.send(result);
};

const getFieldByEntity = async (req, res) => {
    const result = await fieldService.getFields(req.params.entity);
    res.send(result);
};

module.exports = {
    createFields,
    getFields,
    getFieldByEntity
}