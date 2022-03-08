import { useState } from "react";
import ConfigMenuProps from "./ConfigMenu.types";
import "./style.css"

const ConfigMenu = ({actualConfig, setConfig}:ConfigMenuProps) => {
    const [workingSession, setWorkingSession] = useState((actualConfig.workingSession).getMinutes());
    const [breakSession, setBreakSession] = useState((actualConfig.breakSession).getMinutes());

    const submitConfig = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setConfig({...actualConfig, workingSession: new Date(workingSession * 60000), breakSession: new Date(breakSession * 60000)});
    }

    return (
        <div className="ConfigMenu">
            <form onSubmit={submitConfig}>
                <label>
                    Working Session
                    <input type="number" value={workingSession} onChange={(e) => setWorkingSession(parseInt(e.target.value))}/>
                </label>
                <label>
                    Break Session
                    <input type="number" value={breakSession} onChange={(e) => setBreakSession(parseInt(e.target.value))}/>
                </label>
                <label>
                    <input type="checkbox"/>
                    Long Break Session
                </label>
                <button>Salvar</button>
            </form>
        </div>        
    )
}

export default ConfigMenu;