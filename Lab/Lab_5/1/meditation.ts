class Meditation {
    duration: number;

    constructor(duration: number) {
        this.duration = duration;
    }

    start(): void {
        let currentCount = this.duration;
        const intervalId = setInterval(() => {
            if (currentCount > 0) {
                console.log(currentCount);
                currentCount--;
            } else {
                console.log('Jay Guru Dev');
                clearInterval(intervalId);  // Stop the interval when the countdown ends
            }
        }, 1000);  // Counts down every second
    }
}

const morning_meditation = new Meditation(5);
morning_meditation.start();
console.log(`Start meditation`);
