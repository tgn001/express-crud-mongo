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

    var records = [];
    employees.forEach(emp => {
      if (emp) {
        const empsRecord =
        {
          id: emp._id,
          name: emp.name,
          role: emp.role
        }
        records.push(empsRecord);
      }
    });

    resp.json(records);
  } catch (error) {
    next(error);
  }
});

/* Get employee based on id*/
router.get('/employee/:id', async (req, resp, next) => {

  try {
    const emp = await employee.findById(req.params.id);

    resp.json(
      {
        id: emp._id,
        name: emp.name,
        role: emp.role
      }
    );

  } catch (error) {
    next(error);
  }
});

/* Edit existing employee based on id*/
router.put('/employee/:id', async (req, resp, next) => {

  try {
    const requestBody = { name: req.body.name, role: req.body.role };

    let emp_rec = await employee.findById(req.params.id);

    if (!emp_rec) 
    return res.status(404).json({ msg: 'Employee record not found' });

    const updatedEmp = await employee.findByIdAndUpdate(
      req.params.id, requestBody, { new: true });

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
