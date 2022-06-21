import Effect from "./Effect"

function LiveEffects( { effects }){
    return(
        <div>
            <h1>Effects Chain</h1>
            {effects.map(effect=>{
                return(
                    <Effect effect={effect} />
                )
            })}
        </div>
    )
}

export default LiveEffects