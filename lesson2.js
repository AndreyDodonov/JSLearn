 let num = 266219;
 let strNum = num + ''; // неявное приведение типов
 let arrNum = strNum.split(''); // загоняем числа в массив
 let i = arrNum.length;
 let result = 1;
 while (i > 0){
     result *= arrNum[--i];
 }
 console.log('произведение: ' + result);
 let cubeResult = result**3;
 console.log('возведение в куб: ' + (cubeResult));
 let strCubeResult = cubeResult + '';
 let arrCubeResult = strCubeResult.split('');
  console.log('первые два числа: ' + arrCubeResult.slice(0,2));

 
    
    
 


