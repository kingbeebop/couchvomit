import { useState, useEffect } from "react"
import Effect from "./Effect"

function MidiBrain( { effects, onSave }){
    window.AudioContext = window.AudioContext || window.webkitAudioContext

    const [oscType, setOscType] = useState('sine')

    let ctx
    const oscillators = {}

    const [effectsRack, setEffectsRack] = useState([])

    // useEffect(()=>{
    //     fetch('.../rack')
    //     .then(res=>res.json())
    //     .then(data=>setEffectsRack(data))
    // },[])

    useEffect(()=>{

        effectsRack.forEach(effect=>{
            switch (effect.type) {
                case 'delay':
                    {}
                case 'reverb' :
                    {}
                case 'equalizer':
            }
        })
    }, effectsRack)

    useEffect(()=>{
    const startButton = document.querySelector('button')
    startButton.addEventListener('click', ()=>{
        ctx = new AudioContext()
        console.log(ctx)
    })

    if (navigator.requestMIDIAccess){
        navigator.requestMIDIAccess().then(success, failure)
    }
    
    },[])


    function midiToFreq(number) {
        const a = 440
        return (a/32)*(2**((number-9)/12))
    }

    
    
    function failure(){
        console.log('Could not connect')
    }
    
    function success(midiAccess){
        console.log("Connected!")
        midiAccess.addEventListener('statechange', updateDevices)
        const inputs = midiAccess.inputs

        console.log(inputs)
        inputs.forEach(input=>{
            input.addEventListener('midimessage', handleInput)
        })

    }

    function handleInput(input){
        
        const command = input.data[0]
        const note = input.data[1]
        const velocity = input.data[2]
        
        console.log(command, note, velocity)

        switch (command) {
            case 144: //note on
            {if (velocity > 0) {
                noteOn(note, velocity)
            }
            else {
                noteOff(note)
            }
            break;}
            case 128:
                {noteOff(note)
                break;}
        }
    }

    function noteOn(note, velocity){
        console.log(note)
        console.log(ctx)
        console.log(oscillators)
        
        const osc = ctx.createOscillator()
        
        const oscGain = ctx.createGain()
        oscGain.gain.value = .33

        const velocityGainAmount = velocity/127
        const velocityGain = ctx.createGain()
        velocityGain.gain.value = velocityGainAmount

        osc.type = oscType
        osc.frequency.value = midiToFreq(note)

        osc.connect(oscGain)
        oscGain.connect(velocityGain)
        velocityGain.connect(ctx.destination)

        osc.gain = oscGain
        oscillators[note.toString()] = osc

        osc.start()
    }

    function noteOff(note){
        const osc = oscillators[note.toString()]

        const oscGain = osc.gain

        oscGain.gain.setValueAtTime(oscGain.gain.value, ctx.currentTime)
        oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03)

        setTimeout(()=>{
            osc.stop()
            osc.disconnect()
        }, 20)

        delete oscillators[note.toString()]
    }

    function updateDevices(e){
        console.log(e)
    }

    function handleChange(e){
        e.preventDefault()
        console.log(e.target.value)
        setOscType(e.target.value)
    }

    return(
    <div>
        <div id="midi-brain">
        <form>
            <label>Oscillator Type: </label>
            <select name="oscillator" id="oscillator" onChange={handleChange}>
                <option value="sine" >Sine</option>
                <option value="square" >Square</option>
                <option value="triangle" >Triangle</option>
                <option value="sawtooth" >Sawtooth</option>
            </select>
        </form>
        <button>START</button>
        </div>
        <div id="effects-rack">
            <h1>Effects Chain</h1>
            <button onClick={onSave}>Save</button>
            {effects.map(effect=>{
                return(
                    <Effect effect={effect} />
                )
            })}
        </div>
    </div>)
}

export default MidiBrain