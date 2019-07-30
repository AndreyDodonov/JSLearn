'use strict';

let cssText = {
    height: 'height: 20px',
    width: 'width: 50px',
    bg: 'background: inherit',
    fontSize: 'font-size: large'
};

function DomElement(selector, options) {
    this.selector = selector;
    options = options || {};
    this.createElem = function () {
        let newDiv;
        if (this.selector[0] === '.') {
            newDiv = document.createElement('div');
            newDiv.classList.add(selector.replace('.', ''));
            this.cssText(newDiv);
        } else if (this.selector[0] === '#') {
            newDiv = document.createElement('p');
            newDiv.id = selector.replace('#', '');
            this.cssText(newDiv);
        }
        newDiv.textContent = selector.replace(/'#.'/g, '');
        document.body.appendChild(newDiv);
    };
    this.cssText = function (elem) {
        let listAttr = '';
        for (let item in options) {
            listAttr += options[item] + ';';
        }
        elem.setAttribute('style', listAttr);
        console.log(listAttr);
    };
}
const newDiv = new DomElement('.divClass', cssText);
newDiv.createElem();
const newP = new DomElement('#pId', cssText);
newP.createElem();

let squareCss = {
    height: 'height: 150px',
    width: 'width: 150px',
    background: 'background-color: tomato',
    position: 'position: absolute'
};
const square = new DomElement('.square', squareCss);
square.textContent = '';

document.addEventListener('DOMContentLoaded', () => {

    square.createElem();
});

let moving = function (e) {
    let squareFrom = document.querySelector('.square');
    squareFrom.textContent = '';
    let squareStyle = window.getComputedStyle(document.querySelector('.square'));
    let left = parseInt(squareStyle.marginLeft);
    let top = parseInt(squareStyle.marginTop);

    switch (e.keyCode) {
        case 37:
            squareFrom.style.marginLeft = left - 10 + 'px';
            break;
        case 39:
            squareFrom.style.marginLeft = left + 10 + 'px';
            break;
        case 38:
            squareFrom.style.marginTop = top - 10 + 'px';
            break;
        case 40:
            squareFrom.style.marginTop = top + 10 + 'px';
            break;
    }
};

addEventListener('keydown', moving);