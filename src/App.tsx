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
      image: "http://media.services.zam.com/v1/media/byName/hs/cards/enus/CS2_171.png",
      name: "",
      result: ""
    };  
    this.setName = this.setName.bind(this);
    this.getCard = this.getCard.bind(this);
  }

  public getCard = () => {
    fetch('https://omgvamp-hearthstone-v1.p.mashape.com/cards/' + this.state.name, {
      headers: {
        'Accept' : 'application/json',
        'X-Mashape-Key' : 'umhsTza6z7mshV6ax0uG7zY5uY9dp180Mlhjsnh1ZK83NPtgzA'
      }
    }).then((result) => {
      return result.json();
    }).then((data) => {
      // tslint:disable-next-line:no-console
      console.log(data[0].img);
      const imageData = data[0].img;
      this.setState({image: imageData});
    })
  }

  public setName(e: React.ChangeEvent<HTMLInputElement>){
    this.setState({name: e.target.value})
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
            <Input className="Input" placeholder="Card name" value={this.state.name} onChange={this.setName}/>
            <Button className="Search-button" variant="contained" onClick={this.getCard} >Search</Button>
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
