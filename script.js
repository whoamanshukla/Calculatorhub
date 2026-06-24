const ageForm = document.getElementById("ageForm");
const dobInput = document.getElementById("dob");
const calcDateInput = document.getElementById("calcDate");
const resetBtn = document.getElementById("resetBtn");
const errorMessage = document.getElementById("errorMessage");

const exactAgeEl = document.getElementById("exactAge");
const totalMonthsEl = document.getElementById("totalMonths");
const totalWeeksEl = document.getElementById("totalWeeks");
const totalDaysEl = document.getElementById("totalDays");
const nextBirthdayEl = document.getElementById("nextBirthday");
const birthDayEl = document.getElementById("birthDay");
const zodiacSignEl = document.getElementById("zodiacSign");
const totalHoursEl = document.getElementById("totalHours");

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

if (calcDateInput) {
  calcDateInput.value = formatDateForInput(new Date());
}

if (ageForm) {
  ageForm.addEventListener("submit", function (e) {
    e.preventDefault();
    calculateAge();
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", resetCalculator);
}

function formatDateForInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseInputDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function calculateAge() {
  clearError();

  const dobValue = dobInput.value;
  const calcDateValue = calcDateInput.value;

  if (!dobValue) {
    showError("Please select your date of birth.");
    return;
  }

  const birthDate = parseInputDate(dobValue);
  const compareDate = calcDateValue ? parseInputDate(calcDateValue) : new Date();

  birthDate.setHours(0, 0, 0, 0);
  compareDate.setHours(0, 0, 0, 0);

  if (birthDate > compareDate) {
    showError("Date of birth cannot be later than the selected calculation date.");
    return;
  }

  const age = getDetailedAge(birthDate, compareDate);
  const diffMs = compareDate - birthDate;
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = age.years * 12 + age.months;
  const totalHours = totalDays * 24;

  const nextBirthdayData = getNextBirthdayInfo(birthDate, compareDate);
  const birthDay = birthDate.toLocaleDateString("en-US", { weekday: "long" });
  const zodiac = getZodiacSign(birthDate.getDate(), birthDate.getMonth() + 1);

  exactAgeEl.textContent = `${age.years} years, ${age.months} months, ${age.days} days`;
  totalMonthsEl.textContent = totalMonths.toLocaleString();
  totalWeeksEl.textContent = totalWeeks.toLocaleString();
  totalDaysEl.textContent = totalDays.toLocaleString();
  totalHoursEl.textContent = totalHours.toLocaleString();
  nextBirthdayEl.textContent = `${nextBirthdayData.daysLeft} day(s) on ${nextBirthdayData.nextBirthdayFormatted}`;
  birthDayEl.textContent = birthDay;
  zodiacSignEl.textContent = zodiac;
}

function getDetailedAge(birthDate, compareDate) {
  let years = compareDate.getFullYear() - birthDate.getFullYear();
  let months = compareDate.getMonth() - birthDate.getMonth();
  let days = compareDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const previousMonth = new Date(compareDate.getFullYear(), compareDate.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function getNextBirthdayInfo(birthDate, compareDate) {
  let nextBirthday = new Date(
    compareDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  nextBirthday.setHours(0, 0, 0, 0);

  if (nextBirthday < compareDate) {
    nextBirthday = new Date(
      compareDate.getFullYear() + 1,
      birthDate.getMonth(),
      birthDate.getDate()
    );
    nextBirthday.setHours(0, 0, 0, 0);
  }

  const diffMs = nextBirthday - compareDate;
  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  const nextBirthdayFormatted = nextBirthday.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return { daysLeft, nextBirthdayFormatted };
}

function getZodiacSign(day, month) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  return "Pisces";
}

function showError(message) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = "";
}

function resetCalculator() {
  ageForm.reset();
  calcDateInput.value = formatDateForInput(new Date());
  clearResults();
  clearError();
}

function clearResults() {
  exactAgeEl.textContent = "--";
  totalMonthsEl.textContent = "--";
  totalWeeksEl.textContent = "--";
  totalDaysEl.textContent = "--";
  nextBirthdayEl.textContent = "--";
  birthDayEl.textContent = "--";
  zodiacSignEl.textContent = "--";
  totalHoursEl.textContent = "--";
}
