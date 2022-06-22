import { useState, useEffect } from "react"
import EffectsRack from "./EffectsRack"
import LiveEffects from "./LiveEffects"
import MidiBrain from "./MidiBrain"

function AudioContainer() {

  const [effects, setEffects] = useState([])
  const [liveEffects, setLiveEffects] = useState([])

//   useEffect(()=>{
//     fetch()
//     .then(res=>res.json())
//     .then(data=>setEffects(data))
//   },[])

  return (
    <div>
      <MidiBrain effects = {liveEffects} />
      <LiveEffects effects = {liveEffects} />
      <EffectsRack effects = {effects} />
    </div>
  );
}

export default AudioContainer;
