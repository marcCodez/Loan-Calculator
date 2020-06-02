// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', calculateResults);


// Calculate Results
function calculateResults(e){
    console.log('calculating...');
    // UI Vars
    const UIamount = document.querySelector('#amount');
    const UIinterest = document.querySelector('#interest');
    const UIyears = document.querySelector('#years');
    const UImonthlyPayment = document.querySelector('#monthly-payment');
    const UItotalPayment = document.querySelector('#total-payment');
    const UItotalInterest = document.querySelector('#total-interest');

    // principal is actually UIamount, but UIamount is only pointing to the input and we need the value
    // We want the value as a decimal so we use parseFloat
    const principal = parseFloat(UIamount.value);
    const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
    const calculatedPayments = parseFloat(UIyears.value) * 12;

    // Compute monthly payment
    // Math.pow gives us the power
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x-1);

    //We want to check if monthly is a finite number, isFinite JS method

    if(isFinite(monthly)) {
        // We set the input value to monthly rounded to 2dp
        UImonthlyPayment.value = monthly.toFixed(2);
        UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
        UItotalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    } else {
        // if not finite then something went wrong
        // We can just make a div in the html hide it initially and then show it
        // But we'll use the createElement method from the document Object and create it through JS
       showError('Please check your numbers')

    }


    // since its a form submit we want to prevent the default behaviour
    e.preventDefault();
}

// Show Error
function showError(error){
// Create a div
const errorDiv = document.createElement('div');

// Insert all of this into the DOM
// Get elements
const card = document.querySelector('.card');
const heading = document.querySelector('.heading')

// In bootstrap when you want to show an alert you'd want to give it a class of alert
// as well as alert-danger which will make it red
// Add class
errorDiv.className = 'alert alert-danger'

// Create text node and append to div
errorDiv.appendChild(document.createTextNode(error))

// Insert error above heading
//insertBefore gets called on a parent and you pass in the element you want to put in
card.insertBefore(errorDiv, heading);

// For better UX
// Clear error after 3 seconds, setTimeout takes in 2 params function and time
setTimeout(clearError, 3000);

}

// Clear error
function clearError(){
    document.querySelector('.alert').remove();
}