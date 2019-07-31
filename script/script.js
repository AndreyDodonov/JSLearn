"use strict";

const start = document.querySelector('#start');
const btnPlus = document.getElementsByTagName('button');
let buttonsPlusIncome = document.querySelectorAll('button')[0];
let expensesPlus = document.querySelectorAll('button')[1];
const deposit = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetDayValue = document.querySelector('.budget_day-value');
const budgetMonthValue = document.querySelector('.budget_month-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const accumulatedMonthValue = document.querySelector('.accumulated_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');
const salaryAmount = document.querySelector('.salary-amount');
let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpenses = document.querySelector('.additional_expenses');
const depositCheck = document.querySelector('#deposit-check');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
let block;

class AppDataClass {
    constructor(income = {}, incomeMonth = 0, addIncome = [], expenses = {}, addExpenses = [], deposit = false, 
        percentDeposit = 0, moneyDeposit = 0, budget = 0, budgetDay = 0, budgetMonth = 0, expensesMonth = 0) {
        this.income = income;
        this.incomeMonth = incomeMonth;
        this.addIncome = addIncome;
        this.addExpenses = addExpenses;
        this.expenses = expenses;
        this.deposit = deposit;
        this.percentDeposit = percentDeposit;
        this.moneyDeposit = moneyDeposit;
        this.budget = budget;
        this.budgetDay = budgetDay;
        this.budgetMonth = budgetMonth;
        this.expensesMonth = expensesMonth;
    }
    getExpenses() {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    start() {
        if (salaryAmount.value === '') {
            start.setAttribute('disabled', 'disabled');
            return;
        }

        block = true;
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getExpensesMonth();
        this.getAdd(additionalExpensesItem.value.split(','), this.addExpenses);
        this.getAdd(additionalIncomeItem, this.addIncome);
        this.getIncome();
        this.getDepositInfo();
        this.getBudget();
        this.showResult();

        let buttonReset = start.cloneNode(true);
        buttonReset.id = 'reset';
        buttonReset.textContent = 'Сбросить';
        start.parentNode.replaceChild(buttonReset, start);
        let reset = document.querySelector('#reset');
        let allInput = document.querySelectorAll('input[type=text] ');
        allInput.forEach(function (item) {
            item.setAttribute('disabled', 'disabled');
        });
        reset.addEventListener('click', this.reset.bind(this));
        collectCookie();
    }
    reset() {
        block = false;
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.expensesMonth = 0;
        this.budget = 0;
        this.budgetMonth = 0;
        let reset = document.querySelector('#reset');
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
        buttonsPlusIncome.style.display = 'block';
        periodSelect.value = 1;
        deposit.checked = false;
        depositCheck.value = 'off';
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositAmount.value = '';
        depositPercent.style.display = 'none';
        periodAmount.textContent = 1;
        reset.parentNode.replaceChild(start, reset);
        localStorage.clear();
    }
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        this.calcPeriod();
        periodSelect.addEventListener('change', this.calcPeriod.bind(this));
    }
    addBlock(items, subclassName, buttonName, valText = '', valNumber = '') {
        let cloneItem = items[0].cloneNode(true);
        cloneItem.querySelector(`.${subclassName}-title`).value = valText;
        cloneItem.querySelector(`.${subclassName}-amount`).value = valNumber;
        items[0].parentNode.insertBefore(cloneItem, buttonName);
        this.checkCorrectVale();
        items = document.querySelectorAll(`.${subclassName}-items`);
        if (items.length === 3) {
            buttonName.style.display = 'none';
        }
        return items;
    }
    changeRange() {
        periodAmount.textContent = periodSelect.value;
    }
    getIncome() {
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
                this.incomeMonth += +cashIncome;
            }
        });
    }
    getAdd(additionalItem, addObject) {
        // addObject=[];
        additionalItem.forEach((item) => {
            let itemValue;
            if (!Array.isArray(additionalItem)) {
                itemValue = item.value.trim();
            } else {
                itemValue = item.trim();
            }
            if (itemValue !== '') {
                addObject.push(itemValue);
            }
        });
    }
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }
    getExpensesMonth() {
        for (let prop in this.expenses) {
            this.expensesMonth += +this.expenses[prop];
        }
    }
    getBudget() {
        this.budgetMonth = ((isNaN(this.budget) ? 0 : this.budget) +
            this.incomeMonth - this.expensesMonth) + (this.percentDeposit * this.moneyDeposit / 12);
        this.budgetDay = (this.budgetMonth / 30);
    }
    getTargetMonth() {
        return (targetAmount.value / this.budgetMonth);
    }
    getDepositInfo() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    calcPeriod() {
        incomePeriodValue.value = (this.budgetMonth * periodSelect.value);
    }
    checkCorrectVale() {
        let inputBlocks = document.querySelectorAll('[placeholder="Наименование"]');
        inputBlocks.forEach(function (item) {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^а-яА-Я,.!? \-;:]/g, '');
            });
        });
        let inputNumberBlocks = document.querySelectorAll('[placeholder="Сумма"]');
        inputNumberBlocks.forEach(function (item) {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^0-9]/g, '');
            });
        });
    }
    eventsListeners() {
        const self = this;
        if (!depositCheck.checked && localStorage.getItem('depositCheck') !== 'on') {
            depositCheck.value = 'off';
        } else {
            depositCheck.value = 'on';
        }
        depositCheck.addEventListener('change', () => {
            if (depositCheck.checked) {
                this.deposit = true;
                depositCheck.value = 'on';
                depositBank.style.display = 'inline-block';
                depositAmount.style.display = 'inline-block';
                depositBank.addEventListener('change', function () {
                    let selectIndex = this.options[this.selectedIndex].value;
                    if (selectIndex === 'other') {
                        depositPercent.style.display = 'inline-block';
                        depositPercent.removeAttribute('disabled');
                        depositPercent.value = '';
                    } else {
                        depositPercent.style.display = 'none';
                        depositPercent.value = selectIndex;
                    }
                });
            } else {
                this.deposit = false;
                depositCheck.value = 'off';
                depositBank.style.display = 'none';
                depositAmount.style.display = 'none';
                depositAmount.value = '';
            }
        });
        this.checkCorrectVale();
        start.addEventListener('click', this.start.bind(this));
        expensesPlus.addEventListener('click', () => {
            expensesItems =
                this.addBlock(expensesItems, 'expenses', expensesPlus);
        });
        buttonsPlusIncome.addEventListener('click', () => {
            incomeItems =
                this.addBlock(incomeItems, 'income', buttonsPlusIncome);
        });
        periodSelect.addEventListener('change', this.changeRange);
        salaryAmount.addEventListener('change', () => {
            start.removeAttribute('disabled');
        });
    }
}

const appData = new AppDataClass();
appData.eventsListeners();
const objForCookie = {
    'budgetDayValue': budgetDayValue,
    'budgetMonthValue': budgetMonthValue,
    'expensesMonthValue': expensesMonthValue,
    'accumulatedMonthValue': accumulatedMonthValue,
    'additionalIncomeValue': additionalIncomeValue,
    'additionalExpensesValue': additionalExpensesValue,
    'incomePeriodValue': incomePeriodValue,
    'targetMonthValue': targetMonthValue,
    salaryAmount,
    incomeItems,
    expensesItems,
    expensesAmount,
    additionalExpenses,
    depositCheck,
    depositBank,
    depositAmount,
    depositPercent,
    targetAmount,
    periodSelect,
    periodAmount: periodSelect,
    additionalExpensesItem,
    additionalIncomeItem
};

function setCookie(name, value, options = {}) {
    let expires = options.expires;
    if (typeof expires == "number" && expires) {
        let d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + "=" + value;
    for (let propName in options) {
        updatedCookie += "; " + propName;
        let propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }
    document.cookie = updatedCookie;
}

function collectCookie() {
    for (let item in objForCookie) {
        setCookie(item, objForCookie[item].value, 60);
        localStorage.setItem(item, objForCookie[item].value);
    }
    let incomeItemsJSON = [];
    incomeItems.forEach((item) => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            incomeItemsJSON.push({
                itemIncome,
                cashIncome
            });
        }
    });
    let expensesItemsJSON = [];
    expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            expensesItemsJSON.push({
                itemExpenses,
                cashExpenses
            });
        }
    });
    appData.addIncome = [];
    appData.getAdd(additionalIncomeItem, appData.addIncome);
    console.log(appData.addIncome);
    setCookie('additionalIncomeItem', JSON.stringify(appData.addIncome), 60);
    localStorage.setItem('additionalIncomeItem', JSON.stringify(appData.addIncome));
    setCookie('incomeItems', JSON.stringify(incomeItemsJSON), 60);
    localStorage.setItem('incomeItems', JSON.stringify(incomeItemsJSON));
    setCookie('expensesItems', JSON.stringify(expensesItemsJSON), 60);
    localStorage.setItem('expensesItems', JSON.stringify(expensesItemsJSON));
    setCookie('isLoad', true, 60);
    setCookie('block', block, 60);
    localStorage.setItem('block', block);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    });
}
let checkEqual = true;

function loadCookie() {
    for (let item in objForCookie) {
        if (getCookie(item) === undefined || getCookie(item) !== localStorage.getItem(item)) {
            checkEqual = false;
            break;
        }
    }
    if (checkEqual == false) {
        for (let item in objForCookie) {
            deleteCookie(item);
        }
        localStorage.clear();
    }
    if (checkEqual) {
        setTimeout(() => {
            budgetDayValue.value = localStorage.getItem('budgetDayValue');
            budgetMonthValue.value = localStorage.getItem('budgetMonthValue');
            expensesMonthValue.value = localStorage.getItem('expensesMonthValue');
            accumulatedMonthValue.value = localStorage.getItem('accumulatedMonthValue');
            additionalIncomeValue.value = localStorage.getItem('additionalIncomeValue');
            additionalExpensesValue.value = localStorage.getItem('additionalExpensesValue');
            incomePeriodValue.value = localStorage.getItem('incomePeriodValue');
            targetMonthValue.value = localStorage.getItem('targetMonthValue');
            salaryAmount.value = localStorage.getItem('salaryAmount');
            expensesAmount.value = localStorage.getItem('expensesAmount');
            additionalExpenses.value = localStorage.getItem('additionalExpenses');
            let incomeItemsJSON = JSON.parse(localStorage.getItem('incomeItems'));
            let expensesItemsJSON = JSON.parse(localStorage.getItem('expensesItems'));
            let additionalIncomeItemJSON = JSON.parse(localStorage.getItem('additionalIncomeItem'));
            for (let i = 0; i < additionalIncomeItemJSON.length; i++) {
                additionalIncomeItem[i].value = additionalIncomeItemJSON[i];
            }
            additionalIncomeItem = document.querySelectorAll('.additional_income-item');
            let counter = 0;
            incomeItemsJSON.forEach((item) => {
                if (counter == 0) {
                    incomeItems[0].querySelector('.income-title').value = item.itemIncome;
                    incomeItems[0].querySelector('.income-amount').value = item.cashIncome;
                } else {
                    appData.addBlock(incomeItems, 'income-items .income',
                        buttonsPlusIncome, item.itemIncome, item.cashIncome);
                }
                counter++;
            });
            incomeItems = document.querySelectorAll('.income-items');
            counter = 0;
            expensesItemsJSON.forEach((item) => {
                if (counter == 0) {
                    expensesItems[0].querySelector('.expenses-title').value = item.itemExpenses;
                    expensesItems[0].querySelector('.expenses-amount').value = item.cashExpenses;
                } else {
                    appData.addBlock(expensesItems, 'expenses-items .expenses',
                        expensesPlus, item.itemExpenses, item.cashExpenses);
                }
                counter++;
            });
            expensesItems = document.querySelectorAll('.expenses-items');
            buttonsPlusIncome = document.querySelectorAll('button')[0];
            if (incomeItems.length === 3) {
                buttonsPlusIncome.style.display = 'none';
            }
            expensesPlus = document.querySelectorAll('button')[1];
            if (expensesItems.length === 3) {
                expensesPlus.style.display = 'none';
            }
            if (localStorage.getItem('depositCheck') === 'on') {
                depositCheck.checked = 'checked';
            } else {
                depositCheck.removeAttribute('checked');
            }
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            if (depositCheck.checked) {
                depositBank.value = localStorage.getItem('depositBank');
                depositAmount.value = localStorage.getItem('depositAmount');
                depositBank.style.display = 'inline-block';
                depositAmount.style.display = 'inline-block';
                if (depositBank.selectedIndex == 4) {
                    depositPercent.style.display = 'inline-block';
                } else {
                    depositPercent.style.display = 'none';
                }
                depositPercent.value = localStorage.getItem('depositPercent');
            }
            targetAmount.value = localStorage.getItem('targetAmount');
            periodSelect.value = localStorage.getItem('periodSelect');
            periodAmount.textContent = periodSelect.value;
            additionalExpensesItem.value = localStorage.getItem('additionalExpensesItem');
        }, 0);
        if (localStorage.getItem('block') == 'true') {
            let buttonReset = start.cloneNode(true);
            buttonReset.id = 'reset';
            buttonReset.textContent = 'Сбросить';
            start.parentNode.replaceChild(buttonReset, start);
            let reset = document.querySelector('#reset');
            let allInput = document.querySelectorAll('input[type=text] ');
            allInput.forEach(function (item) {
                item.setAttribute('disabled', 'disabled');
            });
            reset.addEventListener('click', appData.reset.bind(appData));
            block = true;
        } else {
            block = false;
        }
    }
}
window.onbeforeunload = collectCookie;
window.onload = loadCookie;