const display = document.getElementById("display");
let input = "";

function updateDisplay() {
  display.innerText = input || "0";
}

function append(value) {
  input += value;
  updateDisplay();
}

function evaluateExpression() {
  try {
    const replaced = input
      .replace(/π/g, Math.PI)
      .replace(/e/g, Math.E)
      .replace(/√/g, "Math.sqrt")
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/log/g, "Math.log10")
      .replace(/ln/g, "Math.log")
      .replace(/\^/g, "**");

    const result = eval(replaced);
    input = result.toString();
  } catch {
    input = "Error";
  }
  updateDisplay();
}

// Digit and operator buttons
document.querySelectorAll(".btn").forEach(btn =>
  btn.addEventListener("click", () => append(btn.innerText))
);

// Operator buttons
document.querySelectorAll(".btn-op").forEach(btn =>
  btn.addEventListener("click", () => append(btn.innerText))
);

// Function buttons
document.querySelectorAll(".btn-func").forEach(btn =>
  btn.addEventListener("click", () => append(btn.innerText))
);

// Equal
document.querySelector(".btn-equal").addEventListener("click", evaluateExpression);

// Clear
document.querySelector(".btn-clear").addEventListener("click", () => {
  input = "";
  updateDisplay();
});

// Delete last char
document.querySelector(".btn-del").addEventListener("click", () => {
  input = input.slice(0, -1);
  updateDisplay();
});
window.onload = () => {
  const allButtons = document.querySelectorAll("button");
  allButtons.forEach(btn => {
    btn.classList.add(
      "rounded-md", "py-2", "shadow-md", "hover:scale-105",
      "transition-transform", "active:shadow-inner", "border", "border-gray-700"
    );
  });
};
