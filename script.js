'use strict';


let money = +prompt('Ваш месячный доход?'),
    income = 'freelance',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    expens1 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    numExpens1 = +prompt('Во сколько это обойдётся?'),
    expens2 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    numExpens2 = +prompt('Во сколько это обойдётся?'),
    budgetMonth = money - numExpens1 - numExpens2,
    mission = 2000000,
    term = mission / budgetMonth,
    period = 5,
    budgetDay = budgetMonth / 30;

if (budgetDay >= 800) {
    console.log('Высокий уровень дхода');
} else if (budgetDay >= 300) {
    console.log('Средний уровень дохода');
} else if (budgetDay < 0) {
    console.log('Что-то пошло не так');
} else if (budgetDay < 300) {
    console.log('Низкий уровень дохода');
}


console.log('Месячный бюджет: ' + budgetMonth);
console.log('Срок достижения цели: ' + Math.ceil(term) + ' месяцев');
console.log(typeof (money));
console.log(typeof (income));
console.log(typeof (deposit));
console.log(income.length);
console.log('Период ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Бюджет на день: ' + Math.floor(budgetDay));