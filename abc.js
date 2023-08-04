function calculateAverage(numbers) {
    let sum = 0;
    console.log(numbers.length)
    for (let i = 0; i < numbers.length; i++) {
      sum += numbers[i];
    }
    return sum / numbers.length;
  }

  console.log(calculateAverage([1,2,3,4]))