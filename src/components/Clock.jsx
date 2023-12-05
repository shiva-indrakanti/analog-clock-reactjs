import { useEffect, useState } from 'react';
import './clock.css';

const Clock = () => {
    const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const [time, updateTime] = useState(new Date());

    useEffect(() => {
        const updateTimeInterval = () => {
            updateTime((prevTime) => new Date(prevTime.getTime()+1000 ));
        };

        const interval = setInterval(updateTimeInterval, 1000);

        return () => clearInterval(interval);
    }, []);

    const secondsRotation = time.getSeconds() * 6;
    const minutesRotation = (time.getMinutes() + time.getSeconds() / 60) * 6;
    const hoursRotation = ((time.getHours() % 12) + time.getMinutes() / 60) * 30;

    const hourHand = { transform: `rotate(${hoursRotation}deg)` };
    const minuteHand = { transform: `rotate(${minutesRotation}deg)` };
    const secondHand = { transform: `rotate(${secondsRotation}deg)` };

    // on change handler
    const changeHandler = (e) => {
        if (e.target.value === "UTC") {
            updateTime((prevTime) => {
                const utcTimeZone = 5 * 60 + 30;
                const adjustedTime = new Date(prevTime.getTime() - utcTimeZone * 60000);
                return adjustedTime;
            });
        }
        else {
            updateTime(new Date());
        }
    }
    return (
        <>

            <div className="main">

                <div className="clock">
                    {numbers.map((number, index) => (
                        <span key={index} style={{ transform: `rotate(${index * 30}deg)` }}>
                            <b style={{ transform: `rotate(${index * -30}deg)` }}>{number}</b>
                        </span>
                    ))}
                    <div className='centerofpoint'></div>
                    <div className='hour' style={hourHand}><i ></i></div>
                    <div className='minute' style={minuteHand}><i ></i></div>
                    <div className='second' style={secondHand} ><i ></i></div>
                </div>
            </div>
            <select className='select' onChange={changeHandler} defaultValue=''>
                <option value='' disabled>Select an option</option>
                <option value="IST">IST</option>
                <option value="UTC">UTC</option>
            </select>
        </>
    );
};

export default Clock;
