import React, {useState} from "react";
import ColorCard from "./components/colorCard";
import Palette from "./components/colorPalette";
import Button from "./components/buttons";
import generateRandomColor from "./utils/generateRandomColor";

export default function App(props) {
    const [colors, setColors] = useState(props.data);
    const [checkCount, setCount] =useState(0);
    const [disableState, setDisableState] = useState(true);
    const [genState, setGenState] = useState(false);

    const colorStatus = colors.map(color => {
        return (
            <ColorCard
                id = {color.id}
                color = {color.color}
                key = {color.id}
                checked = {color.checked}
                handler={checkBoxToggle}
            />
        )
    })

    function checkBoxToggle(id){
        let count = checkCount;
        const updatedColors = colors.map(color => {
            if (id===color.id){
                const newChecked = !(color.checked);
                if(newChecked === false){
                    count--;
                }
                if(newChecked === true ) {
                    count++;
                    setDisableState(false);
                }
                return {...color, checked: newChecked}
            }
            return color;
        });
        setColors(updatedColors);
        setCount(count)
        if(count === 5){setGenState(true)}
        if(count < 5){setGenState(false)}
        if(count === 0){setDisableState(true)}
    }

    function clear(){
        const updatedChecks = colors.map(color => {
            return {...color, checked: false}
        });
        setCount(0);
        setDisableState(true);
        setGenState(false)
        setColors(updatedChecks);
    }

    const toggleOn = () => {
        const newColors = colors.map(color => {
            if (color.checked===false){
                const newColor = generateRandomColor();
                return {...color, color: newColor}
            }
            return color;
        })
        setColors(newColors);
    }

    return (
        <div>
            <header className="header">
                <h1>Color Palette Generator</h1>
            </header>
            <div className="paletteWrapper">
                <Palette
                    data = {colorStatus}
                />
            </div>
            <div className="buttons">
                <Button
                    name = "Generate Colors"
                    handler = {toggleOn}
                    state = {genState}
                />
                <Button
                    name = "Clear Selection"
                    handler ={clear}
                    state = {disableState}
                />
            </div>
        </div>
    )
}


