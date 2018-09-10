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
      image: "",
      name: "",
      result: ""
    }
  }

  public getCard(cardName:string){
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
          <Card/>
        </div>
      </body>
    );
  }
}
export default App;
