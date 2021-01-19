import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div className="journal__entry-picture" 
                style={{
                    backgroundSize: 'cover', 
                    backgroundImage: 'url(https://i.etsystatic.com/15342928/r/il/4b12ea/2387757637/il_570xN.2387757637_ab32.jpg)'
                }}
            ></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Sí, en efecto
                </p>
                <p className="journal__entry-content">
                    El lugar donde las tierras transitorias de los señores convergen...
                </p>
            </div>
            
            <div className="journal__entry-date-box">
                <span>Lunes</span>
                <h4>18</h4>
            </div>
        </div>
    )
}
