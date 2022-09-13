"use strict";
function solveEquation(a, b, c) {
  let arr;
  arr = [];
  let d = b**2-4*a*c;
  if (d === 0) {
    arr[0] = -b/(2*a);
  } else if (d > 0) {
    arr[0] = (-b + Math.sqrt(d) )/(2*a);
    arr[1] = (-b - Math.sqrt(d) )/(2*a);
  }
  return arr;
}


function calculateTotalMortgage(percent, contribution, amount, date) {
  let totalAmount;
  if (Number.isNaN(parseInt(percent))) {
    return `Параметр "Процентная ставка" содержит неправильное значение "${percent}"`;
  }
  if (Number.isNaN(parseInt(contribution))) {
    return `Параметр "Начальный взнос" содержит неправильное значение "${contribution}"`;
  }
  if (Number.isNaN(parseInt(amount))) {
    return `Параметр "Общая стоимость" содержит неправильное значение "${amount}"`;
  }
  percent = percent/1200;
  let creditSum = amount - contribution;
  let currentDate = new Date();
  let mortgageEndDate = new Date(date);
  let countOfMonth = mortgageEndDate.getMonth() - currentDate.getMonth() + (mortgageEndDate.getFullYear() - currentDate.getFullYear())*12;
  let monthOfAmount = creditSum*(percent +(percent/(Math.pow((1+percent),countOfMonth)-1)));
  totalAmount = Math.round(countOfMonth*monthOfAmount*100)/100;
  return totalAmount;
}
