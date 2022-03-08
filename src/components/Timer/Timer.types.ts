import config from "../../pages/Home/Home.types";

interface TimerProps {
    /*workingSession: Date,
    breakSession: Date,*/
    config: config,
    onStart: Function,
    onPause: Function,
    onStop: Function,
    onReset: Function
}

export default TimerProps;