const emiForm = document.getElementById("emiForm");
const loanAmountInput = document.getElementById("loanAmount");
const interestRateInput = document.getElementById("interestRate");
const loanTenureInput = document.getElementById("loanTenure");
const resetBtn = document.getElementById("resetBtn");
const errorMessage = document.getElementById("errorMessage");

const monthlyEmiEl = document.getElementById("monthlyEmi");
const totalInterestEl = document.getElementById("totalInterest");
const totalPaymentEl = document.getElementById("totalPayment");
const principalAmountEl = document.getElementById("principalAmount");
const monthlyRateEl = document.getElementById("monthlyRate");
const tenureMonthsEl = document.getElementById("tenureMonths");
const interestRatioEl = document.getElementById("interestRatio");
const costMultiplierEl = document.getElementById("costMultiplier");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

if (emiForm) {
  emiForm.addEventListener("submit", function (e) {
    e.preventDefault();
    calculateEMI();
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", resetCalculator);
}

function calculateEMI() {
  clearError();

  const principal = parseFloat(loanAmountInput.value);
  const annualRate = parseFloat(interestRateInput.value);
  const tenureYears = parseFloat(loanTenureInput.value);

  if (isNaN(principal) || principal <= 0) {
    showError("Please enter a valid loan amount.");
    return;
  }

  if (isNaN(annualRate) || annualRate < 0) {
    showError("Please enter a valid interest rate.");
    return;
  }

  if (isNaN(tenureYears) || tenureYears <= 0) {
    showError("Please enter a valid loan tenure.");
    return;
  }

  const monthlyRate = annualRate / 12 / 100;
  const tenureMonths = Math.round(tenureYears * 12);

  let emi = 0;

  // 0% interest case
  if (monthlyRate === 0) {
    emi = principal / tenureMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    emi = (principal * monthlyRate * factor) / (factor - 1);
  }

  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;
  const interestRatio = principal > 0 ? (totalInterest / principal) * 100 : 0;
  const costMultiplier = principal > 0 ? totalPayment / principal : 0;

  monthlyEmiEl.textContent = formatCurrency(emi);
  totalInterestEl.textContent = formatCurrency(totalInterest);
  totalPaymentEl.textContent = formatCurrency(totalPayment);
  principalAmountEl.textContent = formatCurrency(principal);
  monthlyRateEl.textContent = `${monthlyRate * 100}%`;
  tenureMonthsEl.textContent = tenureMonths.toLocaleString();
  interestRatioEl.textContent = `${interestRatio.toFixed(2)}%`;
  costMultiplierEl.textContent = `${costMultiplier.toFixed(2)}x`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(value);
}

function showError(message) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = "";
}

function resetCalculator() {
  if (emiForm) emiForm.reset();
  clearResults();
  clearError();
}

function clearResults() {
  monthlyEmiEl.textContent = "--";
  totalInterestEl.textContent = "--";
  totalPaymentEl.textContent = "--";
  principalAmountEl.textContent = "--";
  monthlyRateEl.textContent = "--";
  tenureMonthsEl.textContent = "--";
  interestRatioEl.textContent = "--";
  costMultiplierEl.textContent = "--";
}
