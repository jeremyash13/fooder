import React from 'react'

export default function Heading(props) {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    )
}
