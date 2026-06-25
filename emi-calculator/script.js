const calculateBtn = document.getElementById("calculateBtn");

calculateBtn.addEventListener("click", function () {
  const loanAmount = parseFloat(document.getElementById("loanAmount").value);
  const annualInterestRate = parseFloat(document.getElementById("interestRate").value);
  const loanTenureYears = parseFloat(document.getElementById("loanTenure").value);

  if (
    isNaN(loanAmount) || loanAmount <= 0 ||
    isNaN(annualInterestRate) || annualInterestRate <= 0 ||
    isNaN(loanTenureYears) || loanTenureYears <= 0
  ) {
    alert("Please enter valid loan amount, interest rate and loan tenure.");
    return;
  }

  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const totalMonths = loanTenureYears * 12;

  const emi =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, totalMonths)) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  document.getElementById("monthlyEmi").textContent = "₹" + emi.toFixed(2);
  document.getElementById("totalInterest").textContent = "₹" + totalInterest.toFixed(2);
  document.getElementById("totalPayment").textContent = "₹" + totalPayment.toFixed(2);
});
