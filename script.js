'use strict';

let money,
    start = function () {
        do {
            money = +prompt('Ваш месячный доход?', 50000);
        } while (isNaN(money) || money == '' || money == null);
    };

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: function () {
       return (this.budgetMonth() / 30);
    },
    expensesMonth: 0,
    getExpensesMonth: function () {
        let sum = 0;
        for (let i = 0; i < 2; i++) {
            const key = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Расход' + i);
            const value = +prompt('Во сколько это обойдётся?', 10000);
            appData.expenses[key] = value;
            this.expensesMonth += value;
        }
        return sum;
    },
    budgetMonth: function () {
        return (this.budget - this.expensesMonth);
    },
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
            'расх1, расх2, расх3');
        this.addExpenses = addExpenses.toLowerCase().split(',');
        this.deposit = confirm('Есть ли у вас депозит в банке?');
        this.getExpensesMonth();
    },

    targetPeriod: function () {
        return (appData.mission / this.budgetMonth());
    },
    budgetPeriod: function () {
        return (this.budget * this.period);
    },
    expensePeriod: function () {
        return (this.expensesMonth * this.period);
    },
    incomePeriod: function () {
        return (this.budgetPeriod() - this.expensePeriod());
    },
    getStatusIncome: function () {
        if (this.budgetDay() >= 800) {
            return ('Высокий уровень дохода');
        } else if (this.budgetDay() >= 300) {
            return ('Средний уровень дохода');
        } else if (this.budgetDay() < 0) {
            return ('Что-то пошло не так');
        } else if (this.budgetDay() < 300) {
            return ('Низкий уровень дохода');
        }
    }
};

appData.asking();
appData.budgetDay();

function appDataShow() {
    for (let key in appData) {
        console.log('наша программа включает в себя данные: ' + key + ' ' + appData[key]);
    }
}

/* output */


console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log('Уровень дохода: ', appData.getStatusIncome());
console.log((appData.targetPeriod() > 0) ? 'Срок достижения цели: ' + Math.ceil(appData.targetPeriod()) + ' месяцев' :
    'цель не будет достигнута ((');
console.log('Накопления за период ' + appData.period + ' месяцев: ' + appData.incomePeriod());
console.log('=================================');
appDataShow();