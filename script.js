'use strict';

let inputUser = prompt('Enter the string: ');

function showShortString (inputUser) {
    if (typeof (inputUser) != 'string') {
        console.log('This is not a string!');
        return;
    } else {
        inputUser = inputUser.trim();
        (inputUser.length > 30) ? console.log(inputUser.substr(0, 29) + ' ...') : console.log(inputUser);
    }
}

showShortString(inputUser);
