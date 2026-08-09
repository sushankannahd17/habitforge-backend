// Libraries
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

dayjs.extend(utc);

const streakCalc = (dayMap, totalHabits) => {
    let streak = 0;
    let expectedDate = dayjs.utc().format("YYYY-MM-DD");

    while (true) {
        const completedHabits = dayMap[expectedDate];

        if (!completedHabits || completedHabits.size < totalHabits) {
            break;
        }

        streak++;

        expectedDate = dayjs
            .utc(expectedDate)
            .subtract(1, "day")
            .format("YYYY-MM-DD");
    }

    return streak;
};

module.exports = streakCalc;