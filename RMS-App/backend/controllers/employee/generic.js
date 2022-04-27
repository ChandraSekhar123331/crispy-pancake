// You should not move this into any subdirectory of chef, attend or manager
// This file should be the home for functions that donot differentiate
// between chef, manager etc.. In a better sense these calls
// should be implementable using only operations on the employee table.
// register shouldnot be here as it by nature should access one of
// chef or attendant or manager

const login = function login(req, res) {};

const update = function update(req, res) {};

const getOneInfo = function getOneInfo(req, res) {};

const getAllInfo = function getAllInfo(req, res) {};

// For delete to work in a role independent way, we
// need to do cascade on foreign key references..
// For attendant? Think
// For now we are deferring the implementation of dlete
// Both in the actual controller and also in this
// generic controller.
// const dlete = function dlete(req, res) {};

exports.login = login;
exports.update = update;
// exports.dlete = dlete;
exports.getOneInfo = getOneInfo;
exports.getAllInfo = getAllInfo;
