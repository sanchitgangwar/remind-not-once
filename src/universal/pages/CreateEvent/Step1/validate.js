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

    return errors;
}
