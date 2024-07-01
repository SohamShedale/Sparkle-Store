import MyContext from "./myContext"

const myState = ({children}) => {
    const data = {
    }
  return (
    <MyContext.Provider value={data}>
      {children}
    </MyContext.Provider>
  )
}

export default myState
