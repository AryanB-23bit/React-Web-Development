import React from "react";
export default function Palette(props) {
    return (
        <div>
            <div className="colorCard">
                {props.data}
            </div>

        </div>
    )
}