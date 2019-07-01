let money,
    income,
    addExpenses,
    deposit,
    mission,
    period,
    budgetDay ;

money = 50000;
income = 'freelance';
addExpenses = 'courses, travels, clothes';
deposit = true;
mission = 2000000;
period = 5;
budgetDay = money / 30;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(income.length);
console.log('Период ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase(addExpenses));
console.log(addExpenses.split(', '));
console.log(budgetDay);

