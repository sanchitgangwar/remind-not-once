import moment from 'moment';

function displayStartEndDates(startDate, endDate) {
    const mStartDate = moment(startDate);
    const mEndDate = moment(endDate);

    let startString;
    let endString;

    if (mEndDate.diff(mStartDate) === 0) {
        startString = mStartDate.format('DD MMMM, YYYY');
        return startString;
    }

    if (mStartDate.year() === mEndDate.year()) {
        startString = mStartDate.format('DD MMMM');
        endString = mEndDate.format('DD MMMM, YYYY');

        return `${startString} - ${endString}`;
    }

    startString = mStartDate.format('DD MMMM, YYYY');
    endString = mEndDate.format('DD MMMM, YYYY');

    return `${startString} - ${endString}`;
}

export default {
    displayStartEndDates
};
