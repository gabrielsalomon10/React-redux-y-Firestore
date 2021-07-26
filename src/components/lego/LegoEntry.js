import React from 'react';
import moment from 'moment';



export const LegoEntry = ({ date, descripcion, monto  }) => {

    const noteDate = moment(date);

    return (
        <div 
            className="lego__entry"
        >
            <div 
                className="lego__entry-list"
            ></div>

            <div className="lego__entry-body">
                <p className="lego__entry-title">{ descripcion }</p>
                <p className="lego__entry-content">${ monto }</p>
                <p className="lego__entry-content">{ date }</p>
            </div>
            <div className="lego__entry-date">
                <span>{ noteDate.format('DD/MM/YYYY')}</span>
            </div>
        </div>
    )
}
