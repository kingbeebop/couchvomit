import Effect from "./Effect"

function LiveEffects( { effects, handleClick }){
    return(
        <div>
            <h1>Effects Chain</h1>
            <button onClick={handleClick}>Save</button>
            {effects.map(effect=>{
                return(
                    <Effect effect={effect} />
                )
            })}
        </div>
    )
}

export default LiveEffects