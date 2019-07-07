'use strict';

let lang = prompt('Выбрать язык: ');

// if (lang == "ru") {
//     console.log("Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье");
// } else if (lang == "en") {
//     console.log("Monday, Tuesday, Wednesday, Thurstday, Friday, Saturday, Sunday");
// }

switch(lang) {
    case "ru":
            console.log("Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье");
            break;
    case "en":
            console.log("Monday, Tuesday, Wednesday, Thurstday, Friday, Saturday, Sunday");
            break;
    default:
            console.log("Error");
}


let director;
let teacher;
let namePerson = prompt('Введите имя: ');

(namePerson == 'Артём')? (console.log('директор')): (director = false) ;
(namePerson == 'Максим')? (console.log('преподаватель')): (teacher = false);
(teacher == false)?console.log('студент'): (teacher = false);

