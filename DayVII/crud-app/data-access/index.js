let employees = [
    {id:1,name:'Manish'},
    {id:2,name:'Ashish'},
    {id:3,name:'Aditya'},
    {id:4,name:'Raj'},
    {id:5,name:'Sachin'},
    {id:6,name:'Rahul'}
];

exports.getAllEmployees = function(){
    return employees;
}

exports.getEmployee = function(id){
    return employees.find(e => e.id == Number(id));
}

exports.insertEmployee = function(employee){
    employees = [...employees, {...employee}];
    return true;
}

exports.updateEmployee = function(employee){
    var itemIndex = employees.findIndex(e => e.id === parseInt(employee.id));
    var tempEmployees = [...employees];
    tempEmployees.splice(itemIndex,1,{...employee});
    employees = [...tempEmployees];
    return true;
}

exports.deleteEmployee = function(id){
    employees = [...employees.filter(e => e.id !== parseInt(id))];
    return true;
}