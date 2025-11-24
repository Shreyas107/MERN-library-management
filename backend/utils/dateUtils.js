function calculateDueDate(days) {
  const now = new Date();
  now.setDate(now.getDate() + days);
  return now;
}

module.exports = calculateDueDate;
