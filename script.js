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
    budgetDay = budgetMonth / 30,
    accumulatedMonth;

function getStatusIncome() {
    if (budgetDay >= 800) {
        return ('Высокий уровень дхода');
    } else if (budgetDay >= 300) {
        return ('Средний уровень дохода');
    } else if (budgetDay < 0) {
        return ('Что-то пошло не так');
    } else if (budgetDay < 300) {
        return ('Низкий уровень дохода');
    }
}

function getExpensesMonth(expension1, expension2) {
    return (expension1 + expension2);
}

function getAccumulatedMonth(expension1, expension2, overallIncome) {
    accumulatedMonth = overallIncome - (expension1 + expension2);
    return accumulatedMonth;
}

getAccumulatedMonth(numExpens1, numExpens2, money);

function getTargetMonth(accumulatedMonth, mission) {
    return (mission / accumulatedMonth);
}

let showTypeOf = function (item) {
    console.log('тип переменной ' + item + ': ' + (typeof (item)));
};


/* output */
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Уровень дохода: ', getStatusIncome());
console.log('Срок достижения цели: ', Math.floor(getTargetMonth(accumulatedMonth, mission)) + ' месяцев');
console.log('Накопления за период ' + period + ' месяцев: ' + (money * period));