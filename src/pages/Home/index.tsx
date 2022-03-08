import { useState } from "react";
import DefaultButton from "../../components/Buttons/DefaultButton";
import Timer from "../../components/Timer";
import { BsPlayFill, BsPauseFill, BsStopFill, BsArrowCounterclockwise } from "react-icons/bs"
import "./style.css"
import defaultConfig from "./defaultConfig";
import ConfigMenu from "../../components/ConfigMenu";
import config from "./Home.types";

const Home = () => {
    const [startTimer, setStartTimer] = useState<Function>();
    const [pauseTimer, setPauseTimer] = useState<Function>();
    const [stopTimer, setStopTimer] = useState<Function>();
    const [resetTimer, setResetTimer] = useState<Function>();
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [actualConfig, setActualConfig] = useState<config>(defaultConfig);

    return (
        <div className="Home">
            <Timer config={actualConfig} onStart={setStartTimer} onPause={setPauseTimer} onStop={setStopTimer} onReset={setResetTimer}/>
            <div className="Buttons">
                <DefaultButton color="var(--gray-default)" onClick={() => resetTimer!()}>
                    <BsArrowCounterclockwise/>
                </DefaultButton>

                {!isPaused ?
                <DefaultButton color="var(--green-default)" onClick={() => {startTimer!(); setIsPaused(true)}}>
                    <BsPlayFill/>
                </DefaultButton>:
                <DefaultButton color="var(--orange-default)" onClick={() => {pauseTimer!(); setIsPaused(false)}}>
                    <BsPauseFill/>
                </DefaultButton>
                }

                <DefaultButton color="var(--red-default)" onClick={() => {stopTimer!(); setIsPaused(false)}}>
                    <BsStopFill/>
                </DefaultButton>
            </div>
            <ConfigMenu actualConfig={actualConfig} setConfig={setActualConfig}/>
        </div>
    )
}

export default Home;