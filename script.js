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
        this.budgetDay = (this.budget / 30);
        console.log('дневной бюджет: ' + this.budgetDay);
    },
    expensesMonth: function () {
        let sum = 0;
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
               let key1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Расход1');
            } else if (i === 1) {
               let key1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Расход2');
            }
            do {
                let value = +prompt('Во сколько это обойдётся?', 10000);
                appData.expenses[key1] = value;

            } while (isNaN(sum) || sum == '' || sum == null);
        }
        return sum;
    },
    accumulateMonth: this.expensesMonth(),
    budgetMonth: function () {
        return (this.budget - this.accumulateMonth);
    },
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
            'расх1, расх2, расх3');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    targetPeriod: function () {
        return ((this.budget * this.period) - (this.accumulateMonth * this.period));
    },
    budgetPeriod: function () {
        return (this.budget * this.period);
    },
    expensePeriod: function () {
        return (this.accumulateMonth * this.period);
    },
    incomePeriod: function () {
        return (this.budgetPeriod() - this.expensePeriod());
    },
    getStatusIncome: function () {
        if (this.budgetDay >= 800) {
            return ('Высокий уровень дхода');
        } else if (this.budgetDay >= 300) {
            return ('Средний уровень дохода');
        } else if (this.budgetDay < 0) {
            return ('Что-то пошло не так');
        } else if (this.budgetDay < 300) {
            return ('Низкий уровень дохода');
        }
    }
};

appData.asking();
appData.budgetDay();

/* output */

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log('Уровень дохода: ', appData.getStatusIncome());
console.log((appData.targetPeriod > 0) ? 'Срок достижения цели: ' + Math.floor(appData.targetPeriod) + ' месяцев' :
    'цель не будет достигнута ((');
console.log('Накопления за период ' + appData.period + ' месяцев: ' + (appData.accumulateMonth * appData.period));
