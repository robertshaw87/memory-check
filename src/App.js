import React from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar"
import friends from "./friends.json";
import "./App.css";

const randInt = x => Math.floor(Math.random(x))

const shuffle = (arr) => arr.map((elem, i) => {
    let randIndex = randInt(i);
    arr[i] = arr[randIndex];
    arr[randIndex] = elem;
    return arr;
  })

class App extends React.Component{
  state = {
    friends,
    currScore: 0,
    highScore: 0,
    playing: false,
  };

  addScore = () => {
    return () => this.setState({currScore: this.state.currScore + 1});
  }

  updateHighScore = () => {
    if (this.state.currScore > this.state.highScore)
      return () => this.setState({highScore: this.state.currScore});
    else
      return;
  }

  updateClick = (id) => {
    let friends = this.state.friends;
    let currScore;
    let endGame = false;
    friends.forEach(elem => {
      if (elem.id === id) {
        if (!elem.clicked) {
          elem.clicked = true;
          currScore = this.state.currScore + 1;
        }
        else
          endGame = true;
      }
    });
    shuffle(friends);
    if (endGame) {
      this.endGame();
    } else
      this.setState({friends, currScore});
  }
  
  endGame = () => {
    let currState = this.state;
    if (currState.currScore > currState.highScore)
      currState.highScore = currState.currScore;
    currState.friends.forEach(elem => (elem.clicked = false));
    currState.currScore = 0;
    this.setState(currState);
  }

  removeFriend = id => {
    return () => {
      this.setState({
        friends: this.state.friends.filter(elem => (elem.id !== id))
      })
    }
  };

  render () {
    return (
      <div>
        <Navbar 
          currScore={this.state.currScore}
          highScore={this.state.highScore}
          resetGame={this.endGame}
        />
        <Wrapper>
          {this.state.friends.map((elem, i) => 
            (i < 9 ?
              <FriendCard
                updateClick={this.updateClick}
                image={elem.image}
                key={i}
                id={elem.id}
              />
              :
              ""
            )
          )}
        </Wrapper>
      </div>)
  };
}

export default App;
