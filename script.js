'use strict';

let income = 'freelance',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 2000000,
    period = 3,
    money,
    expens1,
    expens2;

let start = function () {
    do {
        money = +prompt('Ваш месячный доход?');
    } while (isNaN(money) || money == '' || money == null);
};

start();

let budgetDay = function () {
    return (money / 30);
};

function getStatusIncome() {
    if (budgetDay() >= 800) {
        return ('Высокий уровень дхода');
    } else if (budgetDay() >= 300) {
        return ('Средний уровень дохода');
    } else if (budgetDay() < 0) {
        return ('Что-то пошло не так');
    } else if (budgetDay() < 300) {
        return ('Низкий уровень дохода');
    }
}

let epxensesMonth = function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            expens1 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
        } else if (i === 1) {
            expens2 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
        }
        do {
        sum += +prompt('Во сколько это обойдётся?');
        } while (isNaN(sum) || sum == '' || sum == null);
    }
    return sum;
};

let expensesAmount = epxensesMonth();

let expensePeriod = function () {
    return (expensesAmount * period);
};

let accumulateMonth = function () {
    return (money - expensesAmount);
};

let budgetPeriod = function () {
    return (money * period);
};

let incomePeiod = function () {
    return (budgetPeriod() - expensePeriod());
};

let targetPeriod = function () {
    return (mission / accumulateMonth());
};

let showTypeOf = function (item) {
    console.log('тип переменной ' + item + ': ' + (typeof (item)));
};

/* output */
console.log('Уровень дохода: ', getStatusIncome());
console.log((targetPeriod() > 0) ? 'Срок достижения цели: ' +  Math.floor(targetPeriod()) + ' месяцев' :
 'цель не будет достигнута ((');                                                 
console.log('Накопления за период ' + period + ' месяцев: ' + (accumulateMonth() * period));