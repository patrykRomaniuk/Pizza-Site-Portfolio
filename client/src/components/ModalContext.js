import React,{createContext,useState} from 'react'

export const ModalContext = createContext();

export function ModalProvider(props) {
    const [item,setItem] = useState([])
  return (
    <ModalContext.Provider value={[item,setItem]}>
        {props.children}
    </ModalContext.Provider>
  )
}
