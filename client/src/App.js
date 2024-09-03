import React from 'react'

const App = () => {
  return (
    <div className="App">
    <header className="App-header" onClick={()=>{
      console.log("hi")
    }}>
      <h1 className="translate-y-0.5 drop-shadow-xl backdrop-brightness-200 hover:drop-shadow-xl drop-shadow-sm blur-md invert drop-shadow-xl md:filter-none text-4xl font-black font-bold text-blue-500">Hello, Tailwind CSS!</h1>
    </header>
  </div>
  )
}
// hello
export default App;