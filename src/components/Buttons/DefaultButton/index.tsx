import DefaultButtonProps from "./DefaultButton.types";
import "./style.css"

const DefaultButton = ({onClick = () => {console.log("nao foi")}, color, children}:DefaultButtonProps) => {
    return (
        <button className="DefaultButton" onClick={() => onClick()} style={{backgroundColor: color}}>
            <span>{children}</span>
        </button>
    )
}

export default DefaultButton;