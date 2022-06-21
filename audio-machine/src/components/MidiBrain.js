import { useState, useEffect } from "react"

function MidiBrain( { effects }){
    window.AudioContext = window.AudioContext || window.webkitAudioContext

    const [oscType, setOscType] = ('sine')

    function handleChange(e){
        e.preventDefault()
        setOscType(e.target.value)
    }

    let ctx
    const oscillators = {}

    useEffect(()=>{
    const startButton = document.querySelector('button')
    

    startButton.addEventListener('click', ()=>{
        ctx = new AudioContext()
    })
    },[])

    function midiToFreq(number) {
        const a = 440
        return (a/32)*(2**(number-9)/12)
    }

    if (navigator.requestMIDIAccess){
        navigator.requestMIDIAccess().then(success, failure)
    }
    
    function failure(){
        console.log('Could not connect')
    }
    
    function success(midiAccess){
        console.log("Connected!")
        midiAccess.addEventListener('statechange', updateDevices)
        const inputs = midiAccess.inputs

        inputs.forEach(input=>{
            oninput.addEventListener('midimessage', handleInput)
        })

    }

    function handleInput(input){
        console.log(input)

        const command = input.data[0]
        const note = input.data[1]
        const velocity = input.data[2]

        switch (command) {
            case 144: //note on
            if (velocity > 0) {
                noteOn(note, velocity)
            }
            else {
                noteOff()
            }
            case 128:
                noteOff()
                break;
        }
    }

    function noteOn(note, velocity){
        const osc = ctx.createOscilator()
        
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
        oscGain.gain.expoentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03)

        setTimeout(()=>{
            osc.stop()
            osc.disconnect()
        }, 20)

        delete oscillators[note.toString()]
    }

    function updateDevices(e){
        console.log(e)
    }


    return(
    <div>
        <form>
            <label>Oscillator Type: </label>
            <select name="oscillator" id="oscillator">
                <option value="sine" onChange={handleChange}>Sine</option>
                <option value="square" onChange={handleChange}>Square</option>
                <option value="triangle" onChange={handleChange}>Triangle</option>
                <option value="sawtooth" onChange={handleChange}>Sawtooth</option>
            </select>
        </form>
        <button>START</button>
    </div>)
}

export default MidiBrain