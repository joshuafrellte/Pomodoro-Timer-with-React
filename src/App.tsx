import { useState, useEffect } from 'react'


// type Mode = 'study' | 'paused' | 'break' | 'reset'
type Mode = 'study' | 'break' 

const STUDY_TIME = 5;
const BREAK_TIME = 3;

function App() {
  const [mode, setMode] = useState<Mode>('study')
  const [timeLeft, setTimeLeft] = useState(STUDY_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  
  // const bgColor = 
  //   mode === 'study' ? 'bg-green-200' :
  //   mode === 'paused' ? 'bg-red-200' :
  //   mode === 'break' ? 'bg-orange-200' :
  //   'bg-blue-200'

  
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
  }, [timeLeft, mode])

  useEffect(() => {
    if (!hasStarted) {
      document.body.className = 'bg-gray-200'
    } else {
      document.body.className = mode === 'study' ? 'bg-green-200' : 'bg-orange-200'
    }
  }, [hasStarted, mode])

  useEffect(() => {
    if (!isRunning) {
      
    } else {

    }
  }, [mode, isRunning])


  // useEffect(() => {
  //   document.body.addEventListener('load', )
  // })

  function handleStart() {
    setHasStarted(true)
    setMode(mode === 'study' ? 'study' : 'break')
    setIsRunning(true)
  }

  function handlePause() {
    setIsRunning(false)
    // setMode('paused')
  }

  function handleReset() {
    setIsRunning(false)
    setTimeLeft(STUDY_TIME)
    // setMode('reset')
    setTimeout(() => {
      setMode('study')
    }, 1000)
  }

  function formatTime() {
    const formattedMinutes = String(Math.floor(timeLeft / 60)).padStart(2,'0')
    const formattedSeconds = String((timeLeft) % 60).padStart(2,'0')
    
    return (`${formattedMinutes}:${formattedSeconds}`)
  }
  
  function handleStatus() {
    
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 text-center">
      <label className="text-3xl tracking-wide font-semibold">
        {mode.toUpperCase()}
      </label>
      <div className="bg-gray-50 rounded-2xl shadow-xl w-[360px] sm:w-[500px] h-[250px] sm:h-[325px] mt-3 flex flex-col justify-center items-center gap-5 sm:gap-7">
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
    </div>
  )
}

export default App
