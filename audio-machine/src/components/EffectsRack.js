import Effect from "./Effect"

function EffectsRack({ effects }){
    return(
        <div>
            {effects.map(effect=>{
                return(
                    <Effect />
                )
            })}
        </div>
    )
}

export default EffectsRack