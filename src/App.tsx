import { Button, Card, Input } from '@material-ui/core';
import * as React from 'react';
import './App.css';

interface IHearthstoneCard{
  image: string;
  name: string;
  result: any;
}

class App extends React.Component<{},IHearthstoneCard> {
  constructor(props:any){
    super(props);
    this.state = {
      image: "https://d1u5p3l4wpay3k.cloudfront.net/hearthstone_gamepedia/c/c8/Stonetusk_Boar%2876%29.png?version=feaca8125122935600ae22c550e464f5c",
      name: "",
      result: ""
    }
  }

  public getCard(cardName:any){
    fetch('https://omgvamp-hearthstone-v1.p.mashape.com/cards/' + cardName)
    .then(results => {
      return results.json;
    })
  }

  public render() {
    return (
      <body>
        <div className="App">
          <header className="App-header">
            <div className="Header-text">HearthStone Card Finder</div>
          </header>
        </div>
        <div>
          <Card className="Main-card">
            <Input className="Input" placeholder="Card name"/>
            <Button className="Search-button" variant="contained">Search</Button>
          </Card>
        </div>
        <div>
          <Card  className="Image-card">
            <img className="Card-image" src={this.state.image}/>
          </Card>
        </div>
      </body>
    );
  }
}
export default App;
