import { useState } from "react"
import MyContext from "./myContext"

const myState = ({children}) => {
  const [mode, setMode] = useState('light')

  const toggleMode = () => {
    let changedTheme = mode == 'light' ? 'dark' : 'light'
    setMode(changedTheme) 
    document.body.style.backgroundColor = changedTheme == 'light' ? '#ffffff' : "rgb(17,24,39)";
  }

  return (
    <MyContext.Provider value={{mode,toggleMode}}>
      {children}
    </MyContext.Provider>
  )
}

export default myState
