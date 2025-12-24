import { useState, useEffect } from 'react'

function App() {
  const [timeLeft, setTimeLeft] = useState(3)
  const [isRunning, setIsRunning] = useState(false)
  const bgColor = isRunning ? "bg-green-200" : "bg-red-200"

  useEffect(() => {
    if (!isRunning) return

    const intervalId = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setIsRunning(false)
          return 0
        }
        return t-1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isRunning])

  useEffect(() => {
    document.body.className = bgColor 
  }, [bgColor])


  function formatTime() {
    const formattedMinutes = String(Math.floor(timeLeft / 60)).padStart(2,'0')
    const formattedSeconds = String((timeLeft) % 60).padStart(2,'0')
    
    return (`${formattedMinutes}:${formattedSeconds}`)
  }
  

  return (
    <div className="bg-gray-50 rounded-2xl shadow-xl w-[360px] sm:w-[500px] h-[250px] sm:h-[325px] absolute top-1/2 left-1/2 -translate-1/2 flex flex-col justify-center items-center gap-5 sm:gap-7">
      <div className="text-8xl font-semibold sm:text-9xl">
        <span>{formatTime()}</span>
      </div>
      <div className="flex gap-4 sm:gap-6">
        <button 
          className="bg-green-700 active:bg-green-900 text-white text-2xl px-4 pt-1 pb-2 w-25 sm:px-5 rounded-sm cursor-pointer"
          disabled={isRunning}
          onClick={() => setIsRunning(true)}
        >
          Start
        </button>
        <button 
          className="bg-red-700 active:bg-red-900 text-white text-2xl px-4 pt-1 pb-2 w-25 sm:px-5 rounded-sm cursor-pointer"
          disabled={!isRunning}
          onClick={() => setIsRunning(false)}
        >
          Pause
        </button>
      </div>
    </div>
  )
}

export default App
