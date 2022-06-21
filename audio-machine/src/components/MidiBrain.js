import { useEffect } from "react"

function MidiBrain( { oscType, effects }){
    window.AudioContext = window.AudioContext || window.webkitAudioContext

    let ctx

    useEffect(()=>{
    const startButton = document.querySelector('button')
    const oscillators = {}

    startButton.addEventListener('click', ()=>{
        ctx = new AudioContext()
    })

    function midiToFreq(number) {
        const a = 440
        return (a/32)*(2**(number-9)/12)
    }

    if (navigator.requestMIDIAccess){
        navigator.requestMIDIAccess().then(success, failure)
    }
    
    function failure(){
        console.log('could not connect')
    }
    
    function success(midiAccess){
        midiAccess.addEventListener('statechange', updateDevices)
        const inputs = midiAccess.inputs

        inputs.forEach(input=>{
            oninput.addEventListener('midimessage', handleInput)
        })

    }

    function handleInput(input){
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

        osc.type = 'sine'
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
},[])

    return(<button>START</button>)
}

export default MidiBrain