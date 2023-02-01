var express = require('express');
const connection = require('../config/database-config');
const employee = require('../models/employee');
var router = express.Router();


/* Add new employee*/
router.post('/employee', async (req, resp, next) => {
  const { name, role } = req.body;

  try {
    const newEmployee = new employee({
      name: name,
      role: role
    });

    const savedEmployee = await newEmployee.save();
    resp.json(savedEmployee);

  } catch (error) {
    next(error);
  }
});


/* GET all employees listing. */
router.get('/employees', async (req, resp, next) => {

  try {
    const employees = await employee.find();
    resp.json(employees);
  } catch (error) {
    next(error);
  }
});

/* Get employee based on id*/
router.get('/employee/:id', async (req, resp, next) => {

  try {
    const emp = await employee.findById(req.params.id);
    resp.json(emp);

  } catch (error) {
    next(error);
  }
});

/* Edit existing employee based on id*/
router.put('/employee/:id', async (req, resp, next) => {

  try {
    const updatedEmp = await employee.findById(
      req.params.id, req.body, {new: true});

    await updatedEmp.save();
    resp.json(updatedEmp);

  } catch (error) {
    next(error);
  }
});

/* Delete employee based on id*/
router.delete('/employee/:id', async (req, resp, next) => {

  try {
    const emp = await employee.findByIdAndDelete(req.params.id);
    resp.send(`Employee ${emp.name} record deleted!`)
  } catch (error) {
    next(error);
  }
});

/* Delete all employees*/
router.delete('/employees', async (req, resp, next) => {

  try {
    const emp = await employee.remove({});
    resp.send(`All employee records has been deleted!`)
  } catch (error) {
    next(error);
  }

});
module.exports = router;
