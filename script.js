function calculateWithCacheFunction(sortFunction) {
    const cache = {};
  
    return function(inputString) {
      const key = inputString.trim().replace(/\s+/g, ',');
      
      if (cache[key]) {
        console.log('Using cached result.');
        return cache[key];
      }
  
      const result = sortFunction(inputString);
      cache[key] = result;
      return result;
    };
  }
  
  function bubbleSortFunction(inputString) {
    const numbers = inputString.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
    
    if (numbers.length === 0) {
      return 'No numbers to sort.';
    }
  
    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < numbers.length - i - 1; j++) {
        if (numbers[j] > numbers[j + 1]) {
          [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]]; // Swap
        }
      }
    }
  
    return numbers.join(', ');
  }
  
  const cachedSort = calculateWithCacheFunction(bubbleSortFunction);
  
  document.getElementById("sortButton").addEventListener("click", () => {
    const inputField = document.getElementById("numberInput");
    const errorMessage = document.getElementById("errorMessage");
    const output = document.getElementById("output");
  
    const input = inputField.value.trim();
  
    errorMessage.textContent = "";
    output.textContent = "";
  
    if (input === "") {
      errorMessage.textContent = "Please enter valid numbers separated by commas or spaces.";
      return;
    }
  
    const result = cachedSort(input);
  
    if (result === 'No numbers to sort.') {
      errorMessage.textContent = result;
    } else {
      output.textContent = "Sorted numbers: " + result;
    }
  });
  
  document.getElementById("clearButton").addEventListener("click", () => {
    document.getElementById("numberInput").value = "";
    document.getElementById("errorMessage").textContent = "";
    document.getElementById("output").textContent = "";
  });

  