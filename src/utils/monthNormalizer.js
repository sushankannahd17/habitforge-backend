const normalizeMonth = (month) => {
    if (typeof month === "number") return month;

    const map = {
        january: 1,
        february: 2,
        march: 3,
        april: 4,
        may: 5,
        june: 6,
        july: 7,
        august: 8,
        september: 9,
        october: 10,
        november: 11,
        december: 12
    };

    return map[month.toLowerCase()];
};

module.exports = normalizeMonth