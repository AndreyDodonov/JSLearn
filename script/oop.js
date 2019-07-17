'use strict';

/* cancel button */
let calcButton = document.getElementById('#cancel');

/* plus buttons */
let plusButtonIncome = document.getElementsByTagName('button')[0]; 
let plusButtonExpenses = document.getElementsByTagName('button')[1];

/* checkbox */
let checkBoxDepositCheck = document.querySelector('#deposit-check');

/* input additional income */
let inputAddIncome = document.querySelectorAll('.additional_income-item');

/* inputs from left side */
let inputSalaryAmount = document.querySelector('.salary-amount'),
    inputIncomeTitle = document.querySelector('.income-title'),
    inputIncomeAmount = document.querySelector('.income-amount'),
    inputAdditionalIncomeItem = document.querySelectorAll('.additional_income-item')[0],
    inputAdditionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1],
    inputExpensesTitle = document.querySelector('.expenses-title'),
    inputExpensesAmount = document.querySelector('.expenses-amount'),
    inputAddExpensesAmount = document.querySelector('.additional_expenses-item'),
    inputDepositAmount = document.querySelector('.deposit-amount'),
    inputDepositPercent = document.querySelector('.deposit-percent'),
    inputTargetAmount = document.querySelector('.target-amount'),
    inputPeriodSelect = document.querySelector('.period-select');

/* Result inputs (right part of screen) */
let inputBudgetMonth = document.querySelector('.budget_month-value'),
    inputIncome =  document.querySelector('.additional_income-value'),
    inputExpensesMonth = document.querySelector('.expenses_month-value'),
    inputIncomePeriod = document.querySelector('.income_period-value'),
    inputTargetMonth = document.querySelector('.target_month-value'),
    inputBudgetDay = document.querySelector('.budget_day-value'),
    inputAddExpenses = document.querySelector('.additional_expenses-value');
                         
 /* output */        

console.log(calcButton);
console.log(plusButtonIncome);
console.log(plusButtonExpenses);
console.log(checkBoxDepositCheck);
console.log(inputAddIncome); 
console.log(inputBudgetMonth);  
console.log(inputIncome);
console.log(inputExpensesMonth);
console.log(inputIncomePeriod);
console.log(inputTargetMonth);
console.log(inputBudgetDay);
console.log(inputAddExpenses);
console.log(inputSalaryAmount);
console.log(inputIncomeTitle);
console.log(inputIncomeAmount);
console.log(inputAdditionalIncomeItem);
console.log(inputAdditionalIncomeItem2);
console.log(inputExpensesTitle);
console.log(inputExpensesAmount);
console.log(inputDepositAmount);
console.log(inputDepositPercent);
console.log(inputTargetAmount);
console.log(inputPeriodSelect);
