'use strict';

let money,
    income,
    addExpenses,
    deposit,
    mission,
    period,
    budgetDay ;

money = +prompt('Ваш месячный доход?');
income = 'freelance';
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
let expens1 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let numExpens1 = +prompt('Во сколько это обойдётся?');
let expens2 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let numExpens2 = +prompt('Во сколько это обойдётся?');
let budgetMonth = money - numExpens1 - numExpens2;
mission = 2000000;
let term = mission / budgetMonth;
period = 5;
budgetDay = budgetMonth / 30;

if (budgetDay >= 800) {
    console.log('Высокий уровень дхода');
} else if (budgetDay >= 300) {
    console.log('Средний уровень дохода');    
} else if (budgetDay < 300) {
    console.log('Низкий уровень дохода');
}


console.log('Месячный бюджет: ' + budgetMonth);
console.log('Срок достижения цели: ' + Math.ceil(term) + ' месяцев');
console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(income.length);
console.log('Период ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase(addExpenses));
console.log(addExpenses.split(', '));
console.log('Бюджет на день: ' + budgetDay);
