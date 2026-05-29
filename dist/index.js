"use strict";
function createEmploye({ name, fullname, age, dni, category }) {
    const newEmploye = {
        name,
        fullname,
        age,
        dni,
        category
    };
    return newEmploye;
}
const employeOne = createEmploye({
    name: 'Alejandro',
    fullname: 'Luna',
    age: 22,
    dni: 4398413,
    category: ['Sistema']
});
console.log(employeOne);
