import { useState, useEffect } from 'react'

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const bgColor = isRunning ? "bg-green-200" : "bg-red-200"

  useEffect(() => {
    if (!isRunning) return

    document.body.className = bgColor 
    
    const intervalId = setInterval(() => {
      setTimeLeft(t => t - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isRunning])


  function formatTime() {
    let formattedMinutes = (Math.floor(timeLeft / 60)).toFixed(0)
    let formattedSeconds = String((timeLeft) % 60).padStart(2,'0')
    
    return (`${formattedMinutes}:${formattedSeconds}`)
  }
  

  return (
    <div className="bg-gray-50 rounded-2xl shadow-xl w-[360px] sm:w-[500px] h-[250px] sm:h-[325px] absolute top-1/2 left-1/2 -translate-1/2 flex flex-col justify-center items-center gap-3">
      <div className="text-8xl font-semibold sm:text-9xl">
        <span>{formatTime()}</span>
      </div>
      <div className="flex gap-4">
        <button 
          className="bg-green-700 active:bg-green-900 text-white text-2xl px-4 py-1 w-25 rounded-sm cursor-pointer"
          onClick={() => setIsRunning(true)}
        >
          Start
        </button>
        <button 
          className="bg-red-700 active:bg-red-900 text-white text-2xl px-4 py-1 w-25 rounded-sm cursor-pointer"
          onClick={() => setIsRunning(false)}
        >
          Pause
        </button>
      </div>
    </div>
  )
}

export default App
