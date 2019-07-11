'use strict';

let money,
    start = function () {
        do {
            money = +prompt('Ваш месячный доход?', 50000);
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
    expensesMonth: function () {
        let sum = 0;
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Расход1');
            } else if (i === 1) {
                prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Расход2');
            }
            do {
                sum += +prompt('Во сколько это обойдётся?', 10000);
            } while (isNaN(sum) || sum == '' || sum == null);
        }
        return sum;
    },
    budgetMonth: function () {
        return (this.budget - expensesMonth);
    },
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
        'расх1, расх2, расх3');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },

};


appData.asking();
appData.budgetDay();
let expensesMonth = appData.expensesMonth(),
    accumulateMonth = appData.budgetMonth();

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

let expensePeriod = function () {
    return (expensesMonth * appData.period);
};


let budgetPeriod = function () {
    return (money * appData.period);
};

let incomePeiod = function () {
    return (budgetPeriod() - expensePeriod());
};

let targetPeriod = function () {
    return (appData.mission / accumulateMonth);
};



/* output */

console.log('Расходы за месяц: ' + expensesMonth);
console.log('Уровень дохода: ', getStatusIncome());
console.log((targetPeriod() > 0) ? 'Срок достижения цели: ' + Math.floor(targetPeriod()) + ' месяцев' :
    'цель не будет достигнута ((');
console.log('Накопления за период ' + appData.period + ' месяцев: ' + (accumulateMonth * appData.period));
