import React, { useEffect, useRef, useState } from "react";
import "./style.css"
import TimerProps from "./Timer.types";

const Timer = ({config, onStart, onPause, onStop, onReset}: TimerProps) => {
    let interval:any = useRef();
    const isWorkingSession = useRef(true);
    const [timerIsStopped, setTimerIsStopped] = useState<boolean>(true);
    const [initialStyle, setInitialStyle] = useState<React.CSSProperties>({});
    const [actualSession, setActualSession] = useState<Date>(config.workingSession);

    useEffect(() => {
        onPause(() => pauseTimer);
        onStop(() => stopTimer);
        onReset(() => resetTimer);

        const pauseTimer = () => {
            setTimerIsStopped(true);
        }

        const stopTimer = () => {
            clearInterval(interval);
            isWorkingSession.current = true;
            setTimerIsStopped(true);
            setActualSession(config.workingSession);
            /*setInitialStyle({stroke: "var(--green-default)"});*/
        }

        const resetTimer = () => {
            if(timerIsStopped === false){
                isWorkingSession.current = true;
                setActualSession(config.workingSession);
                setInitialStyle({stroke: "var(--red-default)", animationDuration: config.workingSession.getMinutes() * 60 + "s"});
            }
        }
    }, [onPause, onReset, onStop, config.workingSession, timerIsStopped]);

    useEffect(() => {
        onStart(() => startTimer);

        const startTimer = () => {
            setInitialStyle({stroke: isWorkingSession.current ? "var(--red-default)" : "var(--green-default)", animationDuration: (isWorkingSession.current ? config.workingSession.getMinutes() * 60 : config.breakSession.getMinutes() * 60) + "s"});
            setTimerIsStopped(false);
        }    

        if(timerIsStopped === false){
            interval.current = setInterval(() => {
                let updateTimer:Date;

                if(actualSession.getMinutes() > 0 || actualSession.getSeconds() > 1 ){
                    updateTimer = new Date(actualSession);
                    updateTimer.setSeconds(updateTimer.getSeconds() - 1);
                    console.log(updateTimer);
                }else if(isWorkingSession.current){
                    isWorkingSession.current = false;
                    updateTimer = config.breakSession;
                    setInitialStyle({stroke: "var(--green-default)", animationDuration: config.breakSession.getMinutes() * 60 + "s"});
                    config.audioEndSession?.play();
                }else{
                    isWorkingSession.current = true;
                    updateTimer = config.workingSession;
                    setInitialStyle({stroke: "var(--red-default)", animationDuration: config.workingSession.getMinutes() * 60 + "s"});
                    config.audioEndSession?.play();
                }

                setActualSession(updateTimer);
            }, 1000);
    
            return () => {
                clearInterval(interval.current);
            }
        }
    }, [onStart, actualSession, timerIsStopped, config.workingSession, config.breakSession, config.audioEndSession]);

    useEffect(() => {
        setActualSession(config.workingSession);
    }, [config.workingSession])

    const timerFormatted = ():string => zeroInLeft(actualSession.getMinutes()) + ":" + zeroInLeft(actualSession.getSeconds());

    const zeroInLeft = (number:number):string => number < 10 ? 0 + number.toString() : number.toString();

    return (
        <div className="Timer">
            <svg>
                <circle cx="80" cy="80" r="70" style={initialStyle} className={timerIsStopped === true ? "Ring paused": "Ring actived"} />
            </svg>
            <span className={timerIsStopped === true ? "Time" : "Time actived"}>{timerFormatted()}</span>
            <span>{isWorkingSession.current ? "Work Time" : "Break Time"}</span>
        </div>
    )
}

export default Timer;