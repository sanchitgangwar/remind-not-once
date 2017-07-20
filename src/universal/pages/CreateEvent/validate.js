import moment from 'moment';

export default function validate(values) {
    const errors = {};

    if (!values.eventName) {
        errors.eventName = 'Required';
    }

    const { tasks } = values;
    errors.tasks = new Array(tasks.length);
    for (let i = tasks.length - 1; i >= 0; --i) {
        if (!tasks[i] || !tasks[i].name || !tasks[i].name.trim().length) {
            errors.tasks[i] = {
                name: 'Required'
            };
        }
    }

    const { occurrences } = values;
    errors.occurrences = new Array(occurrences.length);
    for (let i = occurrences.length - 1; i >= 0; --i) {
        const { startDate, endDate } = occurrences[i];
        const mStartDate = moment(startDate);
        const mEndDate = moment(endDate);

        errors.occurrences[i] = {};

        if (!endDate) {
            errors.occurrences[i].endDate = 'Invalid date';
        }

        if (!startDate) {
            errors.occurrences[i].startDate = 'Invalid date';
        }

        if (startDate && endDate && mEndDate.diff(mStartDate) < 0) {
            errors.occurrences[i].endDate = 'Cannot be less than start date.';
        }
    }

    return errors;
}
