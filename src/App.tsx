import { useState, useEffect } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
import { RiResetLeftFill } from 'react-icons/ri';

type Mode = 'study' | 'break'

const STUDY_TIME = 20 ;
const BREAK_TIME = 10 ;

function App() {
  const [mode, setMode] = useState<Mode>('study')
  const [timeLeft, setTimeLeft] = useState(STUDY_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [status, setStatus] = useState('welcome')

  const playIcon = !isRunning ? <FaPlay /> : <FaPause />
  const iconColor = !isRunning ? 'bg-green-700 active:bg-green-900' : 'bg-red-700 active:bg-red-900'
  
  
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
      const nextMode = mode === 'study' ? 'break' : 'study'
      setMode(nextMode)
      setStatus(nextMode)
      setTimeLeft(nextMode === 'study' ? STUDY_TIME : BREAK_TIME)
    }
  }, [timeLeft, mode])

  useEffect(() => {
    if (!hasStarted) {
      document.body.className = 'bg-gray-200'
    } else {
      if (isRunning) {
        document.body.className = mode === 'study' ? 'bg-green-200' : 'bg-orange-200'
      }
    }
  }, [hasStarted, isRunning, mode])

  function handleStart() {
    setHasStarted(true)
    setMode(mode === 'study' ? 'study' : 'break')
    setStatus(mode)
    setIsRunning(true)
  }

  function handlePause() {
    setIsRunning(false)
    setStatus('paused')
    document.body.className = 'bg-red-200'
  }

  function handleReset() {
    setIsRunning(false)
    setTimeLeft(STUDY_TIME)
    if (hasStarted) document.body.className = 'bg-blue-200'
    setStatus('reset')
    setTimeout(() => {
      setMode('study')
      setStatus('welcome')
      document.body.className = 'bg-gray-200'
    }, 1000)
  }

  function handleToggle() {
    setIsRunning(isRunning ? false : true)
    if (isRunning) handlePause()
    else handleStart()
  }

  function formatTime() {
    const formattedMinutes = String(Math.floor(timeLeft / 60)).padStart(2,'0')
    const formattedSeconds = String((timeLeft) % 60).padStart(2,'0')
    
    return (`${formattedMinutes}:${formattedSeconds}`)
  }

  const radius = 48;
  const circumference = Math.PI * 2 * radius;
  const currentModeDuration = mode === 'study' ? STUDY_TIME : BREAK_TIME;
  const progress = timeLeft / currentModeDuration
  const strokeOffset = (1 - progress) * circumference

  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 text-center flex flex-col justify-center items-center gap-4 scale-120">
      <svg
        className="absolute"
        width="227"
        height="227"
        viewBox="0 0 100 100"
        transform="scale(-1, 1) rotate(-90)"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
        />
      </svg>
      <label className="text-3xl tracking-wide font-semibold">
        {status}
      </label>
      <div className="text-6xl font-semibold bg-white w-[224px] h-[224px] rounded-full flex justify-center items-center">
        <span>{formatTime()}</span>
      </div>
      <div className="flex gap-3 sm:gap-4">
          <button 
            className={`${iconColor} text-white text-xl w-9 h-9 flex justify-center items-center rounded-sm cursor-pointer`}
            onClick={() => handleToggle()}
          >
            {playIcon}
          </button>
          <button 
            className="bg-blue-700 active:bg-blue-900 text-white text-xl w-9 h-9 flex justify-center items-center rounded-sm cursor-pointer"
            disabled={!hasStarted}
            onClick={() => handleReset()}
          >
            <RiResetLeftFill strokeWidth={1}/>
          </button>
        </div>
    </div>
  )
}

export default App
