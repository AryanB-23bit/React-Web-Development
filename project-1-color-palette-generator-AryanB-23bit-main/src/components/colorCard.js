import React from "react";
export default function ColorCard(props) {
    return (
        <div className="palette">
            <div className="colorCard" style={{backgroundColor: props.color}}/>
            <div>
                <input
                    id={props.id}
                    type="checkbox"
                    name = "ColorCard"
                    checked={props.checked}
                    onChange ={()=> props.handler(props.id)}
                />
                {props.color}
           </div>
        </div>
    );
}