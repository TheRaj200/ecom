import { createContext, useContext } from "react";
import { useState } from "react";
const ContextStore = createContext();

const Provider = ({ children }) => {

    const [cart, setCart] = useState([]);

    return (
        <ContextStore.Provider value={{}}>
            {children}
        </ContextStore.Provider>
    )
}

export const useStore = () => useContext(ContextStore);
export default Provider;
