function highAndLow(numbers){
    // ...
    const arrNum = numbers.split(' ');
    let min =Number.MAX_SAFE_INTEGER , max = Number.MIN_SAFE_INTEGER;
    arrNum.forEach(num => {
      num = parseInt(num,10);
      if(min > num) min = num;
      if(max < num) max = num;
    });
    return `${max} ${min}`;
  }