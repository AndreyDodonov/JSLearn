'use strict';

/* cancel button */
let calcButton = document.getElementById('start'),
    /* plus buttons */
    buttonPlus = document.getElementsByTagName('button'),
    incomePlus = buttonPlus[0],
    expensesPlus = buttonPlus[1],
    // plusButtonIncome = document.getElementsByTagName('button')[0],
    // plusButtonExpenses = document.getElementsByTagName('button')[1],
    /* checkbox */
    checkBoxDepositCheck = document.querySelector('#deposit-check'),
    /* input additional income */
    inputAddIncome = document.querySelectorAll('.additional_income-item'),
    /* inputs from left side */
    inputSalaryAmount = document.querySelector('.salary-amount'),
    inputIncomeTitle = document.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    inputExpensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    inputAddExpensesAmount = document.querySelector('.additional_expenses-item'),
    inputDepositAmount = document.querySelector('.deposit-amount'),
    inputDepositPercent = document.querySelector('.deposit-percent'),
    inputTargetAmount = document.querySelector('.target-amount'),
    inputPeriodSelect = document.querySelector('.period-select'),
    /* Result inputs (right part of screen) */
    inputBudgetMonth = document.querySelector('.budget_month-value'),
    inputIncome = document.querySelector('.additional_income-value'),
    inputExpensesMonth = document.querySelector('.expenses_month-value'),
    inputIncomePeriod = document.querySelector('.income_period-value'),
    inputTargetMonth = document.querySelector('.target_month-value'),
    DisplaybudgetDay = document.querySelector('.budget_day-value'),
    inputAddExpenses = document.querySelector('.additional_expenses-value');

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
    budget: 0,
    expensesMonth: 0,
    overalIncome: +0,
    monthlySalary: +0,
    start: function () {

        if (inputSalaryAmount.value === '') {
            alert('Ошибка! Поле "Месячный доход" обязательно для заполнения');
            return;
        }
        appData.monthlySalary = +inputSalaryAmount.value;
        appData.getExpenses();
        appData.getIncome();

        appData.budget = appData.getBudget();
        appData.budgetDay();
        DisplaybudgetDay.value = appData.budgetDay();
    },
    budgetDay: function () {
        return Math.floor(appData.budget / 30);
    },

    getBudget: function () {
        return ((appData.monthlySalary + appData.overalIncome) - appData.expensesMonth);
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = +item.querySelector('.expenses-amount').value;
            if (itemExpenses != '' && cashExpenses != '') {
                appData.expenses[itemExpenses] = cashExpenses;
                appData.expensesMonth += cashExpenses;
                
            }
        });
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = +item.querySelector('.income-amount').value;
            if (itemIncome != '' && cashIncome != '') {
                appData.income[itemIncome] = cashIncome;
                appData.overalIncome += cashIncome;
            }
        });
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

/* event handlers */
calcButton.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);