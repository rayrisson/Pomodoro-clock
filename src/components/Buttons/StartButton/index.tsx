import StartButtonProps from "./StartButton.types";
import { BsPlayFill } from "react-icons/bs"
import "./style.css"

const StartButton = ({onClick = () => {}}:StartButtonProps) => {
    return (
        <button className="StartButton" onClick={onClick()} style={{backgroundColor: "var(--green-default)"}}>
            <span><BsPlayFill/></span>
        </button>
    )
}

export default StartButton;