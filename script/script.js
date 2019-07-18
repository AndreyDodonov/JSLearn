'use strict';

/* cancel button */
let calcButton = document.getElementById('#cancel'),
/* plus buttons */
    plusButtonIncome = document.getElementsByTagName('button')[0],
    plusButtonExpenses = document.getElementsByTagName('button')[1],
/* checkbox */
    checkBoxDepositCheck = document.querySelector('#deposit-check'),
/* input additional income */
    inputAddIncome = document.querySelectorAll('.additional_income-item'),
/* inputs from left side */
    inputSalaryAmount = document.querySelector('.salary-amount'),
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
    inputPeriodSelect = document.querySelector('.period-select'),
/* Result inputs (right part of screen) */
    inputBudgetMonth = document.querySelector('.budget_month-value'),
    inputIncome =  document.querySelector('.additional_income-value'),
    inputExpensesMonth = document.querySelector('.expenses_month-value'),
    inputIncomePeriod = document.querySelector('.income_period-value'),
    inputTargetMonth = document.querySelector('.target_month-value'),
    inputBudgetDay = document.querySelector('.budget_day-value'),
    inputAddExpenses = document.querySelector('.additional_expenses-value');

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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: function () {
        return (this.budget / 30);
    },
    expensesMonth: 0,
    getExpensesMonth: function () {
        let value = 0;
        let key;
        for (let i = 0; i < 2; i++) {
            do {
                key = prompt('Какие обязательные ежемесячные расходы у вас есть?', '№' + (i + 1) + ' Расход');
            } while (key == '' || key == null);
            do {
                value = +prompt('Во сколько это обойдётся?', 10000);
            } while (isNaN(value) || value == '' || value == null);
            appData.expenses[key] = value;
            this.expensesMonth += value;
        }
    },
    getBudget: function () {
        return (this.budget - this.expensesMonth);
    },
    asking: function () {
        if (confirm('Есть ли у вас дополнительный заработок?')) {
            let itemIncome,
                cashIncome;
            do {
                itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Таксую');
            } while (itemIncome == '' || itemIncome == null);
            do {
                cashIncome = +prompt('Сколько зарабатываете этим?', 10000);
            } while (isNaN(cashIncome) || cashIncome == '' || cashIncome == null);
            this.income[itemIncome] = cashIncome;
            this.budget += cashIncome;
        }
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
            'расх1, расх2, расх3');
        this.addExpenses = addExpenses.toLowerCase().split(',');
        this.deposit = confirm('Есть ли у вас депозит в банке?');
        this.getInfoDeposit();
        this.getExpensesMonth();
    },
    getTargetMonth: function () {
        return (appData.mission / (this.budget - this.expensesMonth));
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
    },
    getInfoDeposit: function () {
        if (this.deposit) {
            do {
                this.percentDeposit = +prompt('Какой годовой процент на депозите?', 10);
            } while (isNaN(this.percentDeposit) || this.percentDeposit == '' || this.percentDeposit == null);
            do {
                this.moneyDeposit = +prompt('Какая сумма на депозите?', 10000);
            } while (isNaN(this.moneyDeposit) || this.moneyDeposit == '' || this.moneyDeposit == null);
            this.budget += ((this.moneyDeposit / (this.percentDeposit / 12)) * this.period);
            // (сумма /(процент в месяц) * период накопления)
        }
    },
    calcSavedMoney: function () {
        return (this.budget * this.period);
    }
};

appData.budget = appData.getBudget();
appData.asking();
appData.budgetDay();

function appDataShow() {
    for (let key in appData) {
        console.log('наша программа включает в себя данные: ' + key + ' ' + appData[key]);
    }
}

function addIncomeShow() {
    let output = '';
    console.log('Возможные доходы: ');
    for (let key in appData.income) {
        output += key + ': ' + appData.income[key] + ' ';
    }
    console.log(output);
}

function addsExpensesShow() {
    let counter = 0;
    for (let key in appData.expenses) {
        counter++;
    }
    
    let arr = [];
    console.log('Возможные расходы: ');
    for (let key in appData.expenses) {
        arr.push (key + ': ' + appData.expenses[key]) ;
    }
    console.log(arr.join(', ') );
}

/* output */

addsExpensesShow();
addIncomeShow();

console.log('=================================');
console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log('Уровень дохода: ', appData.getStatusIncome());
console.log((appData.getTargetMonth() > 0) ? 'Срок достижения цели: ' + Math.ceil(appData.getTargetMonth()) +
    ' месяцев' : 'цель не будет достигнута ((');
console.log('Накопления за период ' + appData.period + ' месяцев: ' + appData.incomePeriod());
console.log('=================================');
appDataShow();