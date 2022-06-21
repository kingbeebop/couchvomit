
function Midibrain( { }){
    window.AudioContext = window.AudioContext || window.webkitAudioContext

    const startButton = document.querySelector('button')
    startButton.addEventListner('click', ()=>{
        let ctx = new AudioContext()
    })
    
    if (navigator.requestMIDIAccess){
        navigator.requestMIDIAccess().then(success, failure)
    }
    
    function failure(){
        console.log('could not connect')
    }
    
    function success(midiAccess){
        midiAccess.addeventListner('statechange', updateDevices)
        const inputs = midiAccess.inputs

        inputs.forEach(input=>{
            oninput.addEventListner('midimessage', handleInput)
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

    }

    function noteOff(note){

    }

    function updateDevices(e){
        console.log(e)
    }

    return(<div></div>)
}