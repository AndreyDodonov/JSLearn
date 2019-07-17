'use strict';

/* delete advertising */
    let classAdv = document.querySelector('.adv');
    classAdv.classList.remove('adv'); 
    let tagSpan = document.querySelectorAll('span');
    tagSpan[0].innerText = ' ';
    console.log(tagSpan);


/* change background */
   let elemBody = document.querySelector('body');
    elemBody.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
    elemBody.style.backgroundSize = 'contain';

/* restore book list order */
    let classBook = document.querySelectorAll('.book');
    let tagH2 = document.querySelectorAll('h2');
    // console.log(classBook);
    // console.log(tagH2);
    classBook[0].appendChild(tagH2[1]);
    classBook[1].appendChild(tagH2[0]);
    classBook[2].appendChild(tagH2[4]);
    classBook[3].appendChild(tagH2[3]);
    classBook[4].appendChild(tagH2[5]);
    classBook[5].appendChild(tagH2[2]);    


/* restore chapter list order */
    let tagUl = document.querySelectorAll('ul');
    // console.log(tagUl); 
    classBook[0].appendChild(tagUl[1]);
    classBook[1].appendChild(tagUl[0]);
    classBook[2].appendChild(tagUl[4]);
    classBook[3].appendChild(tagUl[3]);
    classBook[4].appendChild(tagUl[5]);
    classBook[5].appendChild(tagUl[2]);
    

/* fix text in book 3 */

    let tagA = document.querySelectorAll('a');
    //console.log(tagA);
    tagA[2].innerText = 'Книга 3. this и Протопипы Объектов';

/* add chapter in book 6 */
    let tagLi = tagUl[2].querySelectorAll('li');
    let newChapter = document.createElement('li');
    newChapter.innerText = 'Глава 8: За пределами ES6';
    tagUl[2].insertBefore(newChapter, tagLi[9]);


    // console.log(tagLi);
    // console.log(tagUl[2]);
