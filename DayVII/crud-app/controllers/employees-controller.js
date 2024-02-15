const da = require('../data-access');

exports.index = (req,res) => {
    res.render("employees/index",
    {
        pageTitle: "Employees View!",
        empList: da.getAllEmployees()
    });
}

exports.details = (req,res) => {
    var id = req.query.id || req.params.empid; // try with http://localhost:3000/employees/details?id=4 as well
    res.render("employees/details",
    {
        pageTitle: "Employee Details View!",
        employee: da.getEmployee(id)
    });
}

exports.create_get = (req,res) => {
    res.render("employees/create",
    {
        pageTitle: "Create Employee View!"
    });
}

exports.create_post = (req,res) => {
    console.log("body ",req.body);
    var {eid, ename} = req.body; // destructuring
    var employee = {id: parseInt(eid), name: ename};
    if(da.insertEmployee(employee)){
        res.redirect('/employees');
    }else{
        res.render("employees/create",
        {
            pageTitle: "Create Employee View!"
        });
    }
}

exports.edit_get = (req,res) => {
    var id = req.query.id || req.params.empid;
    res.render("employees/edit",
    {
        pageTitle: "Edit Employee View!",
        employee: da.getEmployee(id)
    });
}

exports.edit_post = (req,res) => {
    console.log("body ",req.body);
    var {eid, ename} = req.body; // destructuring
    var employee = {id: parseInt(eid), name: ename};
    if(da.updateEmployee(employee)){
        res.redirect('/employees');
    }else{
        res.render("employees/edit",
        {
            pageTitle: "Edit Employee View!",
            employee
        });
    }
}

exports.delete_get = (req,res) => {
    var id = req.query.id || req.params.empid;
    res.render("employees/delete",
    {
        pageTitle: "Delete Employee View!",
        employee: da.getEmployee(id)
    });
}

exports.delete_post = (req,res) => {
    var id = req.query.id || req.params.empid;
    if(da.deleteEmployee(id)){
        res.redirect('/employees');
    }else{
        res.render("employees/delete",
        {
            pageTitle: "Delete Employee View!",
            employee: da.getEmployee(id)
        });
    }
}