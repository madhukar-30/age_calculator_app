// Get references to the input elements and output elements
const dayInput = document.getElementById("day-input");
const monthInput = document.getElementById("month-input");
const yearInput = document.getElementById("year-input");
const dayOutput = document.querySelector(".days-output");
const monthOutput = document.querySelector(".month-output");
const yearOutput = document.querySelector(".year-output");

// Get references to the error elements
const dayError = document.querySelector(".day-error");
const monthError = document.querySelector(".month-error");
const yearError = document.querySelector(".year-error");

// Get reference to the form and the calculate button
const form = document.querySelector("form");
const btn = document.getElementById("btn");

// Array of invalid characters to prevent users from entering them in the input fields
const invalidChars = ["-", "+", "e"];

// Array to store the number of days in each month
let monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Event listener to prevent users from entering special characters in the input fields
form.addEventListener("keydown", function (e) {
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
});

// Function to limit the length of the input value
function limitLength(event, value, limit) {
  if (value.toString().length >= limit) {
    event.preventDefault();
  }
}

// Object containing validation conditions and error messages for each input field
const validationdata = {
  day: {
    condition: day => day > 0 && day < 32,
    errorMessage: "Must be a valid day",
  },
  month: {
    condition: month => month > 0 && month < 13,
    errorMessage: "Must be a valid month",
  },
  year: {
    condition: year => {
      const now = new Date().getFullYear();
      return year < now;
    },
    errorMessage: "Must be in the past",
  },
};

// Function to validate input values and display error messages
function inputValidation(inputElement, errorElement, validationType) {
  const value = inputElement.value;
  const label = inputElement.previousElementSibling.previousElementSibling;
  const validation = validationdata[validationType].condition(value);
  inputElement.style.borderColor = validation ? "hsl(0, 0%, 86%)" : "hsl(0, 100%, 67%)";
  label.style.color = validation ? "hsl(0, 1%, 44%)" : "hsl(0, 100%, 67%)";
  errorElement.textContent = value ? (validation ? " " : validationdata[validationType].errorMessage) : "This field is required";
  return validation;
}

// Function to animate the number output
function animateNumberOutput(outputElement, targetValue) {
  let currentNumber = 1;
  const interval = setInterval(() => {
    outputElement.textContent = currentNumber;
    currentNumber++;

    if (currentNumber > targetValue) {
      clearInterval(interval);
      outputElement.textContent = targetValue;
    }
  }, 50); // Change the interval to control the animation speed (milliseconds)
}

// Event listener for the calculate button
btn.addEventListener("click", (e) => {
  // Validate the day, month, and year inputs
  const isValidDay = inputValidation(dayInput, dayError, "day");
  const isValidMonth = inputValidation(monthInput, monthError, "month");
  const isValidYear = inputValidation(yearInput, yearError, "year");

  // If all inputs are valid, calculate the age
  if (isValidDay && isValidMonth && isValidYear) {
    const year = yearInput.value;
    const day = dayInput.value;
    const month = monthInput.value;

    // Check if it's a leap year and update the number of days in February
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
      monthDay[1] = 29;
    } else {
      monthDay[1] = 28;
    }

    // Check if the day is valid for the selected month
    if (day > monthDay[month - 1]) {
      const daylabel = dayInput.previousElementSibling.previousElementSibling;
      dayInput.style.borderColor = "hsl(0, 100%, 67%)";
      daylabel.style.color = "hsl(0, 100%, 67%)";
      dayError.textContent = "Must be a valid date";
    } else {
      // If everything is valid, calculate the age
      calculate(day, month, year);
    }
  }
});
// Function to calculate the age and animate the output
function calculate(day,month,year){
   let date = new Date();
   let  currentYear =date.getFullYear();
   let  currentMonth=date.getMonth()+1;
   let  currentDate =date.getDate();
  if(currentDate<day){
      currentMonth = currentMonth-1;
      if(currentMonth==0){
         currentMonth=12;
         currentYear=currentYear-1;
      }
      currentDate= currentDate+monthDay[currentMonth-1];
    }
   if(currentMonth<month){
      currentMonth =currentMonth+12;
      currentYear= currentYear-1;
}
animateNumberOutput(dayOutput, currentDate - day);
animateNumberOutput(monthOutput, currentMonth - month);
animateNumberOutput(yearOutput, currentYear - year);
}


