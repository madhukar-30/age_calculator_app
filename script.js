const dayInput =document.getElementById("day-input");
const monthInput =document.getElementById("month-input");
const yearInput =document.getElementById("year-input");
const dayOutput =document.querySelector(".days-output");
const monthOutput =document.querySelector(".month-output");
const yearOutput=document.querySelector(".year-output");

const allInput =document.querySelectorAll("form input")
const allLabel =document.querySelectorAll("form label")

const dayError =document.querySelector(".day-error");
const  monthError =document.querySelector(".month-error");
const yearError =document.querySelector(".year-error");
const form =document.querySelector("form")
const btn = document.querySelector(".btn")


const validDayError ="Must be a valid day"
const EmptyError="This field is required";
const validMonthError="Must be a valid month"
const  validYearError="Must be a valid year"
const futureYearError ="Must be in the past"

const invalidChars = [
   "-",
   "+",
   "e",
 ];
 let monthDay =[31, 28, 31, 30, 31, 30, 31, 
   31, 30, 31, 30, 31 ]

 //function to prevent special characters
form.addEventListener("keydown",function(e){
   if(invalidChars.includes(e.key)){
      e.preventDefault();
   }
})
//function to limit the lenght the value of input
function limitLength(event,value,limit){
   if(value.toString().length>=limit){
      event.preventDefault();
   }
}



function checkday(){
const day =dayInput.value;
const label =dayInput.previousElementSibling.previousElementSibling;
 dayInput.style.borderColor="hsl(0, 100%, 67%)";
label.style.color="hsl(0, 100%, 67%)";
 
 if(day==''){
    dayError.textContent= EmptyError;
    return false;
   }
   else if(day<1 || day>31){
    dayError.textContent= validDayError;
    return false;
   }
   else{
      dayError.textContent=" ";
     dayInput.style.borderColor="hsl(0, 0%, 86%)";
    label.style.color="hsl(0, 1%, 44%)";
    return true;
   }

}

function checkmonth(){
const month =monthInput.value;
const label =monthInput.previousElementSibling.previousElementSibling;
 monthInput.style.borderColor="hsl(0, 100%, 67%)";
label.style.color="hsl(0, 100%, 67%)";
   if(month==''){
    monthError.textContent= EmptyError;
    return false;
   }
   else if(month<1 || month>12){
    monthError.textContent= validMonthError;
    return false;
   }
   else{
    monthError.textContent=" ";
    monthInput.style.borderColor="hsl(0, 0%, 86%)";
    label.style.color="hsl(0, 1%, 44%)";
    return true;
   }
}


function checkyear(){
    const year =yearInput.value;
    const label =yearInput.previousElementSibling.previousElementSibling;
    yearInput.style.borderColor="hsl(0, 100%, 67%)";
   label.style.color="hsl(0, 100%, 67%)";
    const now = new Date().getFullYear();

   if(year==""){
    yearError.textContent= EmptyError;
    return false;
   }
   else if(year>now){
    yearError.textContent= futureYearError;
  
    return false;
   }
  

   else{
      yearError.textContent=" "
      yearInput.style.borderColor="hsl(0, 0%, 86%)";
      label.style.color="hsl(0, 1%, 44%)";
     
    return true;
   }
  }

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
btn.addEventListener("click",(e)=>{
   if(checkday()&&checkmonth()&&checkyear()){
      const year =yearInput.value;
      const day =dayInput.value;
      const month =monthInput.value;
      if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
         monthDay[1] = 29;
      }
       if(day>monthDay[month-1]){
          allInput.style.borderColor ="hsl(0, 100%, 67%)";
          allLabel.style.color="hsl(0, 1%, 44%)";
          dayError.textContent="Must be a valid date"
      }
      else{
         calculate(day,month,year);
      }
   }
})


