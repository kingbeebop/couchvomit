import Effect from "./Effect"

function EffectsRack({ effects }){
    return(
        <div>
            <h1>Effects Bank</h1>
            {effects.map(effect=>{
                return(
                    <Effect />
                )
            })}
        </div>
    )
}

export default EffectsRack