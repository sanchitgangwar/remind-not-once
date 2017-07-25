import _throttle from 'lodash/throttle';

class ResizeHandler {
    constructor() {
        this.throttled = _throttle(this.handleResize, 1000);
        window.addEventListener('resize', this.throttled);

        this.nSubscribers = 0;
        this.subscribers = [];
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    handleResize = () => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        for (let i = 0; i < this.nSubscribers; ++i) {
            this.subscribers[i]({
                width: this.width,
                height: this.height
            });
        }
    };

    getDimensions() {
        return {
            width: this.width,
            height: this.height
        };
    }

    subscribe(callback) {
        this.subscribers.push(callback);
        this.nSubscribers++;
    }

    unsubscribe(callback) {
        for (let i = 0; i < this.nSubscribers; ++i) {
            if (this.subscribers[i] === callback) {
                this.subscribers.splice(i, 1);
                this.nSubscribers--;
                break;
            }
        }
    }
}

let instance = null;

function getInstance() {
    if (!instance) {
        instance = new ResizeHandler();
    }

    return instance;
}

export default {
    getInstance
};
