import { useState, useEffect } from 'react'


type Mode = 'study' | 'paused' | 'break'
let bgColor: string;

const STUDY_TIME = 5;
const BREAK_TIME = 3;

function App() {
  const [mode, setMode] = useState<Mode>('study')
  const [timeLeft, setTimeLeft] = useState(STUDY_TIME)
  const [isRunning, setIsRunning] = useState(false)
  
  if (mode === 'study') bgColor = 'bg-green-200'
  else if (mode === 'paused') bgColor = 'bg-red-200'
  else if (mode === 'break') bgColor = 'bg-orange-200'

  useEffect(() => {
    if (!isRunning) return
    const intervalId = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isRunning])

  useEffect(() => {
    if (timeLeft === 0) {
      setMode(mode === 'study' ? 'break' : 'study')
      setTimeLeft(mode === 'study' ? BREAK_TIME : STUDY_TIME)
    }
  }, [timeLeft])

  useEffect(() => {
    document.body.className = bgColor
  }, [mode])

  function handleStart() {
    setIsRunning(true)
  }

  function handlePause() {
    setIsRunning(false)
    setMode('paused')
  }

  function handleReset() {
    setIsRunning(false)
    setMode('study')
    setTimeLeft(STUDY_TIME)
  }

  function formatTime() {
    const formattedMinutes = String(Math.floor(timeLeft / 60)).padStart(2,'0')
    const formattedSeconds = String((timeLeft) % 60).padStart(2,'0')
    
    return (`${formattedMinutes}:${formattedSeconds}`)
  }
  

  return (
    <div className="bg-gray-50 rounded-2xl shadow-xl w-[360px] sm:w-[500px] h-[250px] sm:h-[325px] absolute top-1/2 left-1/2 -translate-1/2 flex flex-col justify-center items-center gap-5 sm:gap-7">
      <label>{mode.charAt(0).toUpperCase() + mode.slice(1)}</label>
      <div className="text-8xl font-semibold sm:text-9xl">
        <span>{formatTime()}</span>
      </div>
      <div className="flex gap-4 sm:gap-6">
        <button 
          className="bg-green-700 active:bg-green-900 text-white text-2xl px-4 pt-1 pb-2 w-25 sm:px-5 rounded-sm cursor-pointer"
          disabled={isRunning}
          onClick={() => handleStart()}
        >
          Start
        </button>
        <button 
          className="bg-red-700 active:bg-red-900 text-white text-2xl px-4 pt-1 pb-2 w-25 sm:px-5 rounded-sm cursor-pointer"
          disabled={!isRunning}
          onClick={() => handlePause()}
        >
          Pause
        </button>
        <button 
          className="bg-blue-700 active:bg-blue-900 text-white text-2xl px-4 pt-1 pb-2 w-25 sm:px-5 rounded-sm cursor-pointer"
          onClick={() => handleReset()}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default App
