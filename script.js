// Higher-order function to cache the results of sorting
function calculateWithCacheFunction(sortFunction) {
    const cache = {};
  
    return function(inputString) {
      // Generate a unique key for the cache based on input
      const key = inputString.trim().replace(/\s+/g, ',');
      
      // If the result is already cached, return it
      if (cache[key]) {
        console.log('Using cached result.');
        return cache[key];
      }
  
      // Otherwise, perform the sort and cache the result
      const result = sortFunction(inputString);
      cache[key] = result;
      return result;
    };
  }
  
  // Bubble sort function to sort numbers in ascending order
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
  
  // Create a cached version of the bubble sort function
  const cachedSort = calculateWithCacheFunction(bubbleSortFunction);
  
  document.getElementById("sortButton").addEventListener("click", () => {
    const inputField = document.getElementById("numberInput");
    const errorMessage = document.getElementById("errorMessage");
    const output = document.getElementById("output");
  
    const input = inputField.value.trim();
  
    // Clear previous messages
    errorMessage.textContent = "";
    output.textContent = "";
  
    // Validate the input
    if (input === "") {
      errorMessage.textContent = "Please enter valid numbers separated by commas or spaces.";
      return;
    }
  
    // Use the cached sort function to get the result
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

  