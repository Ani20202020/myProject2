document.getElementById("sortButton").addEventListener("click", () => {
    const inputField = document.getElementById("numberInput");
    const errorMessage = document.getElementById("errorMessage");
    const resultMessage = document.getElementById("resultMessage");
    
    errorMessage.textContent = "";
    resultMessage.textContent = "";


    const input = inputField.value.trim();
    if (!input) {
        errorMessage.textContent = "Please enter valid numbers separated by commas or spaces.";
        return;
    }
    const numbers = input.split(/[\s,]+/).map(Number);
    

    if (numbers.some(isNaN)) {
        errorMessage.textContent = "Please enter valid numbers separated by commas or spaces.";
        return;
    }



    const validNumbers = numbers.filter(num => !isNaN(num));
    

    if (validNumbers.length === 0) {
        resultMessage.textContent = "No numbers to sort.";
        return;
    }


    validNumbers.sort((a, b) => a - b);
    resultMessage.textContent = `Sorted Numbers: ${validNumbers.join(", ")}`;
});




