import config from "./Home.types";
import endSession from "../../assets/songs/endSession.mp3";

const defaultConfig:config = {
    workingSession: new Date(0 * 60000 + 10000),
    breakSession: new Date(1 * 60000),
    audioEndSession: new Audio(endSession)
}

export default defaultConfig;