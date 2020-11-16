import React from 'react';

export default class FavFilmForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title : "", 
      poster: "", 
      comment: ""
    };
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = (e) => {
    e.preventDefault();

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    };

    const url = "https://post-a-form.herokuapp.com/api/movies";

    fetch(url, config)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          alert(
            `Your favourite film ${res.title} has been successfully added!`
          );
        }
      })
      .catch((e) => {
        console.error(e);
        alert("There was an error when adding the movie.");
      });
  };

  render() {
    return (
      <div className="FormEmployee">
        <h1>Add your favorite movie</h1>
        <form onSubmit={this.submitForm}>
          <fieldset>
            <legend>Information</legend>
            <div className="form-data">
              <label htmlFor="title">Name : </label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={this.onChange}
                value={this.state.title}
              />
            </div>
            <div className="form-data">
              <label htmlFor="poster">Poster url: </label>
              <input
                type="text"
                id="poster"
                name="poster"
                onChange={this.onChange}
                value={this.state.poster}
              />
            </div>
            <div className="form-data">
              <label htmlFor="comment">Why this movie? </label>
              <textarea
                id="comment"
                name="comment"
                onChange={this.onChange}
                value={this.state.comment}
              />
            </div>
            <hr />
            <div className="form-data">
              <input type="submit" value="Send" />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }

}