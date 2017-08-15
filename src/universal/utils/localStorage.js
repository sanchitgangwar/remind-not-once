const KEY = 'preferences';

/**
 * Clears the local storage.
 */
function clear() {
    if (window && window.localStorage) {
        localStorage.removeItem(KEY);
    }
}

/**
 * Sets a key to the given value in the local storage.
 *
 * @param {String} key   The key whose value is to be set.
 * @param {Any} value The value to be set.
 */
function set(key, value) {
    if (window && window.localStorage) {
        let obj = localStorage.getItem(KEY);

        try {
            obj = JSON.parse(obj) || {};
        } catch (e) {
            obj = {};
            clear();
        }

        obj[key] = value;
        localStorage.setItem(KEY, JSON.stringify(obj));

        return true;
    }

    return false;
}

/**
 * Gets a value from the local storage or the whole object.
 *
 * @param  {String} key The key to extract from the local storage. If not
 *                      passed, the function returns the whole object.
 * @return {Any}     The key or the whole object.
 */
function get(key) {
    if (window && window.localStorage) {
        let obj = localStorage.getItem(KEY);

        try {
            obj = JSON.parse(obj) || {};
        } catch (e) {
            clear();

            return false;
        }

        return key ? obj[key] : obj;
    }

    return false;
}

export default {
    clear,
    set,
    get
};
