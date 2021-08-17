import React from "react"

const CardForm = ({submitHandler, formInput, enterText, history, deckId}) => {
    return (
        <form className="row justify-content-center" onSubmit={submitHandler}>
        <table className="table col-8 mt-3 border">
          <tbody>
            <tr>
              <th className="col">
                <label htmlFor="card-front">
                  <h4>Front:</h4>
                </label>
              </th>
              <th className="col">
                <textarea
                  value={formInput.front}
                  onChange={enterText}
                  name="card-front"
                  id="card-front"
                />
              </th>
            </tr>
            <tr>
              <th className="col">
                <label htmlFor="card-back">
                  <h4>Back:</h4>
                </label>
              </th>
              <th className="col">
                <textarea
                  value={formInput.back}
                  onChange={enterText}
                  name="card-back"
                  id="card-back"
                />
              </th>
            </tr>
          </tbody>
        </table>
        <div className="col-1 mt-3">
          <div className="row">
            <button
              type="submit"
              className="btn btn-primary col"
              style={{ height: 100 }}
            >
              Save
            </button>
          </div>
          <div className="row" onClick={() => history.push(`/decks/${deckId}`)}>
            <button className="btn btn-secondary col" style={{ height: 100 }}>
              Done
            </button>
          </div>
        </div>
      </form>
    )
}

export default CardForm