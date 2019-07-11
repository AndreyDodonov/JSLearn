'use strict';

let money,
    start = function () {
        do {
            money = +prompt('Ваш месячный доход?');
        } while (isNaN(money) || money == '' || money == null);
    };

start();

let appData = {
    income: {}, //объект
    addIncome: [], //массив
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: function () {
        this.budgetDay = (money / 30);
        console.log('дневной бюджет: ' + this.budgetDay);
    },
    budgetMonth: function () {
        let sum = 0;
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                prompt('Какие обязательные ежемесячные расходы у вас есть?');
            } else if (i === 1) {
                prompt('Какие обязательные ежемесячные расходы у вас есть?');
            }
            do {
                sum += +prompt('Во сколько это обойдётся?');
            } while (isNaN(sum) || sum == '' || sum == null);
        }
        return sum;
    },
    
    expensesMonth: 0,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    
};

appData.asking();
appData.budgetDay();
let budgetMonth = appData.budgetMonth();


// let budgetDay = function () {
//     return (money / 30);
// };

function getStatusIncome() {
    if (appData.budgetDay >= 800) {
        return ('Высокий уровень дхода');
    } else if (appData.budgetDay >= 300) {
        return ('Средний уровень дохода');
    } else if (appData.budgetDay < 0) {
        return ('Что-то пошло не так');
    } else if (appData.budgetDay < 300) {
        return ('Низкий уровень дохода');
    }
}

// let expens1,
//     expens2;

// let epxensesMonth = function () {
//     let sum = 0;
//     for (let i = 0; i < 2; i++) {
//         if (i === 0) {
//             expens1 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
//         } else if (i === 1) {
//             expens2 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
//         }
//         do {
//             sum += +prompt('Во сколько это обойдётся?');
//         } while (isNaN(sum) || sum == '' || sum == null);
//     }
//     return sum;
// };

// let expensesAmount = epxensesMonth();

let expensePeriod = function () {
    return (budgetMonth * appData.period);
};

let accumulateMonth = function () {
    return (money - budgetMonth);
};

let budgetPeriod = function () {
    return (money * appData.period);
};

let incomePeiod = function () {
    return (budgetPeriod() - expensePeriod());
};

let targetPeriod = function () {
    return (appData.mission / accumulateMonth());
};



/* output */

console.log('Расходы за месяц: ' + budgetMonth);
console.log('Уровень дохода: ', getStatusIncome());
console.log((targetPeriod() > 0) ? 'Срок достижения цели: ' + Math.floor(targetPeriod()) + ' месяцев' :
    'цель не будет достигнута ((');
console.log('Накопления за период ' + appData.period + ' месяцев: ' + (accumulateMonth() * appData.period));