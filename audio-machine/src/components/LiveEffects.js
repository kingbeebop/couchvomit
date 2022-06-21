import Effect from "./Effect"

function LiveEffects( { effects }){
    return(
        <div>
            {effects.map(effect=>{
                return(
                    <Effect effect={effect} />
                )
            })}
        </div>
    )
}

export default LiveEffects