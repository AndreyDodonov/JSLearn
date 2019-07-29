'use strict';

/* cancel button */
let calcButton = document.getElementById('start'),
    /* plus buttons */
    buttonPlus = document.getElementsByTagName('button'),
    incomePlus = buttonPlus[0],
    expensesPlus = buttonPlus[1],
    /* checkbox */
    checkBoxDepositCheck = document.querySelector('#deposit-check'),
    /* input additional income */
    inputAddIncome = document.querySelectorAll('.additional_income-item'),
    /* inputsName from left side */
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
    displayPeriod = document.querySelector('.period-amount'),
    /* Result inputsName (right part of screen) */
    displayBudgetMonth = document.querySelector('.budget_month-value'),
    displayAddIncome = document.querySelector('.additional_income-value'),
    displayExpensesMonth = document.querySelector('.expenses_month-value'),
    displayIncomePeriod = document.querySelector('.income_period-value'),
    displayTargetMonth = document.querySelector('.target_month-value'),
    displaybudgetDay = document.querySelector('.budget_day-value'),
    displayAddExpenses = document.querySelector('.additional_expenses-value');

calcButton.style.display = "none"; //view showButton()
showButton();


let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: +0,
    moneyDeposit: +0,
    mission: +0,
    budget: +0,
    expensesMonth: 0,
    overalIncome: +0,
    monthlySalary: +0,
    budgetMonth: +0,
    start: function () {
        this.monthlySalary = +inputSalaryAmount.value;
        appData.getExpenses();
        this.getIncome();
        this.budget = this.getBudget();
        this.budgetDay();
        this.budgetMonth = this.getBudgetMonth();
        this.setMission();
        this.getAddExpenses();
        this.getAddIncome();
        this.showResult(); //calculate and show result  

        let buttonReset = calcButton.cloneNode(true);
        buttonReset.id = 'reset';
        buttonReset.textContent = 'Сбросить';
        calcButton.parentNode.replaceChild(buttonReset, calcButton);

        let allInput = document.querySelectorAll('input[type=text]');
        allInput.forEach(function (item) {
            item.setAttribute('disabled', 'disabled');
        });
        let reset = document.querySelector('#reset');
        reset.addEventListener('click', appData.reset.bind(appData));

    },
    reset: function () {
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.expensesMonth = 0;
        this.budget = 0;
        this.budgetMonth = 0;

        let resetButton = document.querySelector('#reset');
        document.querySelectorAll('input').forEach((item) => item.value = '');
        let allInput = document.querySelectorAll('input[type=text] ');
        allInput.forEach(function (item) {
            item.removeAttribute('disabled');
        });
        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].parentNode.removeChild(expensesItems[i]);
        }
        expensesPlus.style.display = 'block';
        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].parentNode.removeChild(incomeItems[i]);
        }
        incomePlus.style.display = 'block';
        inputPeriodSelect.value = 1;
        checkBoxDepositCheck.checked = false;
        displayPeriod.textContent = 1;
        resetButton.parentNode.replaceChild(calcButton, resetButton);
    },
    showResult: function () {
        displayBudgetMonth.value = this.budgetMonth; //доходы за месяц
        displaybudgetDay.value = this.budgetDay(); //бюджет на день
        displayExpensesMonth.value = this.expensesMonth; //расходы замесяц
        displayIncomePeriod.value = this.budgetPeriod(); //накопления за период
        displayTargetMonth.value = Math.ceil(this.setMission()); //срок достижения цели
        displayAddExpenses.value = this.addExpenses.join(', ');
        displayAddIncome.value = this.addIncome.join(', ');
    },
    // hideInput: function () {
    //     let buttonReset = calcButton.cloneNode(true);
    //     buttonReset.id = 'reset';
    //     buttonReset.textContent = 'Сбросить';
    //     calcButton.parentNode.replaceChild(buttonReset, calcButton);

    //     let allInput = document.querySelectorAll('input[type=text]');
    //     allInput.forEach(function (item) {
    //         item.setAttribute('disabled', 'disabled');
    //     });
    // },
    getBudgetMonth: function () {
        return +(this.overalIncome + this.monthlySalary); //TO DO add 'addIncome'
    },
    budgetDay: function () {
        return Math.floor(this.budget / 30);
    },
    getBudget: function () {
        return ((this.monthlySalary + this.overalIncome) - this.expensesMonth);
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        cloneIncomeItems.querySelector('.income-title').value = '';
        cloneIncomeItems.querySelector('.income-amount').value = '';
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
    getAddExpenses: function () {
        let addExpenses = inputAddExpensesAmount.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        inputAddIncome.forEach((item) => {
            let itemValue = item.value.trim();
            if (item.value !== '') {
                this.addIncome.push(itemValue);
            }
        });
    },
    budgetPeriod: function () {
        return (this.budget * inputPeriodSelect.value);
    },
    expensePeriod: function () {
        return (this.expensesMonth * inputPeriodSelect.value);
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
    // getInfoDeposit: function () {
    //     if (this.deposit) {
    //         do {
    //             this.percentDeposit = +prompt('Какой годовой процент на депозите?', 10);
    //         } while (isNaN(this.percentDeposit) || this.percentDeposit == '' || this.percentDeposit == null);
    //         do {
    //             this.moneyDeposit = +prompt('Какая сумма на депозите?', 10000);
    //         } while (isNaN(this.moneyDeposit) || this.moneyDeposit == '' || this.moneyDeposit == null);
    //         this.budget += ((this.moneyDeposit / (this.percentDeposit / 12)) * this.period);
    //         // (сумма /(процент в месяц) * период накопления)
    //     }
    // },
    calcSavedMoney: function () {
        return (this.budget * inputPeriodSelect.value);
    },
    changePeriod: function () {
        displayPeriod.innerText = inputPeriodSelect.value;
        //this.period = +inputPeriodSelect.value;
        displayIncomePeriod.value = this.budgetPeriod();
    },
    setMission: function () {
        this.mission = inputTargetAmount.value;
        return (this.mission / this.budget);
    }
};

/* input restrictions */
let inputsName = document.querySelectorAll('[placeholder="Наименование"]');
inputsName.forEach(function (item) {
    item.addEventListener('input', () => {
        item.value = item.value.replace(/[^а-яА-Я,.!?\-;:]/g, '');
    });
});
let inputsSum = document.querySelectorAll('[placeholder="Сумма"]');
inputsSum.forEach(function (item) {
    item.addEventListener('input', () => {
        item.value = item.value.replace(/[^0-9]/g, '');
    });
});

/* other functions */
function showButton() { // TO DO hide if not a number
    if (inputSalaryAmount.value === '') {
        calcButton.style.display = 'none';
    } else {
        calcButton.style.display = '';
    }
}

/* event handlers */
inputSalaryAmount.addEventListener('input', showButton);
calcButton.addEventListener('click', appData.start.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
inputPeriodSelect.addEventListener('input', appData.changePeriod.bind(appData));
inputTargetAmount.addEventListener('input', appData.setMission);