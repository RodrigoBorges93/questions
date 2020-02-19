import React, { useState, createContext } from 'react';

export const RespostasContext = createContext();

export const RespostasProvider = (props) => {
    const [resposta, setResposta] = useState([]);
    return (
        <RespostasContext.Provider value={[resposta, setResposta]}>
            {props.children}
        </RespostasContext.Provider>

    );
}