import { useEffect, useState } from "react";
import '../css/timer.css';

function Timer() {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const target = new Date();
            target.setHours(32, 0, 0, 0);

            if (now > target) {
                target.setDate(target.getDate() + 1);
            }

            const difference = target - now;

            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            return { hours, minutes, seconds };
        };

        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="timeDiv">
                <h1>{`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}</h1>
            </div>
        </div>
    );
}

export default Timer;
