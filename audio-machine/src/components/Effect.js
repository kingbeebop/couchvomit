

function Effect({ effect, onDelete, onChange }){

    //delete bot handler function
    function handleDelete(){
      onDelete(bot)
    }

    function handleChange(e){
        
    }

  
    return (
      <div className="ui column">
        <div
          className="ui card"
          key={effect.id}
        >
          <div className="content">
            <div className="header">
              {effect.name}
            </div>
          </div>
          <div className="controls">
            TODO: CONTROLS
            <span>
              <div className="ui center aligned segment basic">
                <button
                  className="ui mini red button"
                  onClick={handleDelete}
                >
                  x
                </button>
              </div>
            </span>
          </div>
        </div>
      </div>
    );
  }

export default Effect