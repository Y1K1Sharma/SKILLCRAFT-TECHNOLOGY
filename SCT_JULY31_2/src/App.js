import React, { useEffect, useState } from "react";
import './App.css'

const App = () => {
  const [time, setTime] = useState(0)
  const [laps, setLaps] = useState([])
  const [isRunning, setIsRunning] = useState(false)

  const getMinutes = ms => ("0" + Math.floor((ms / 60 / 1000) % 60)).slice(-2)
  const getSeconds = ms => ("0" + Math.floor((ms / 1000) % 60)).slice(-2)
  const getMilliSeconds = ms => ("0" + (ms / 10) % 100).slice(-2)

  const formatTime = ms => `${getMinutes(ms)}:${getSeconds(ms)}.${getMilliSeconds(ms)}`

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => setTime(time => time + 10), 10);
    } 
    
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (time) {
      const rest = laps.slice(0,laps.length-1)    
      let last =  time - rest.reduce((acc,x) => acc+x, 0)
      setLaps([...rest,last])
    }
    else {
      setLaps([])
    }
  },[time])

  return (
    <div className="App">
      StopWatch
      <div className="display">{formatTime(time)}</div>

      <div className="buttons">
        {!isRunning && !time && <button onClick={() => setIsRunning(true)}>Start</button>}
        {!isRunning && time > 0 && <button onClick={() => setIsRunning(true)}>Resume</button>}
        {isRunning && <button onClick={() => setIsRunning(false)}>Stop</button>}
        {isRunning && <button onClick={() => setLaps([...laps,0])}>Lap</button>}
        {!isRunning && time > 0 && <button onClick={() => setTime(0)}>Reset</button>}
      </div>

      <div className="laps">
        {laps.map((x,i) => <div key={i}>Lap {i+1}: {formatTime(x)}</div>)}
      </div>
    </div>
  );
};

export default App;
