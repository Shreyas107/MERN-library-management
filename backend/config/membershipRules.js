const membershipRules = {
  student: {
    maxBooks: 3,
    maxDays: 7,
    finePerDay: 10, // ₹10 per day
  },

  faculty: {
    maxBooks: 5,
    maxDays: 30,
    finePerDay: 5, // ₹5 per day
  },

  guest: {
    maxBooks: 1,
    maxDays: 7,
    finePerDay: 20, // ₹20 per day
  },
};

module.exports = membershipRules;
