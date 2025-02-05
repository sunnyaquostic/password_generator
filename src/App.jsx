import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [symbolAllowed, setSymbolAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)


  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopkrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(symbolAllowed) str += "!@#$%^&*()_+"

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * str.length + 1) 
      pass += str.charAt(index)   
    }

    setPassword(pass)
  }, [numberAllowed, symbolAllowed, length])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, symbolAllowed])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-3xl font-bold mb-2 text-center'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
          type="text" 
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
        />
        <button 
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyPasswordToClipboard}
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            name="" 
            id="" 
          />
          <label htmlFor="length"> Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
            type="checkbox" 
            name="" 
            id=""
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }} 
          />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
            type="checkbox" 
            name="" 
            id=""
            defaultChecked={symbolAllowed}
            onChange={() => {
              setSymbolAllowed((prev) => !prev)
            }} 
          />
          <label htmlFor="charInput">Character</label>
        </div>
      </div>
    </div>
  )
}

export default App
