import React from 'react'

export default function Feedback({ match }) {
    return (
        <div>
            {
                match.params.id
            }
        </div>
    )
}
