import { Button, Card, CardMedia, CircularProgress, Grid, Input } from '@material-ui/core';
import * as React from 'react';
import './App.css';

interface IHearthstoneCard {
  cardId: any;
  display: any;
  error: any;
  image: any[];
  loading: any;
  name: string;
  result: any;
  search: string;
}

class App extends React.Component<{}, IHearthstoneCard> {
  constructor(props: any) {
    super(props);
    this.state = {
      cardId: "",
      display: false,
      error: false,
      image: [],
      loading: false,
      name: "",
      result: "",
      search: ""
    };
  }

  public getCard = () => {
    if(this.state.loading){
      return;
    }
    this.setState({ loading: true });
    this.setState({ error: false });
    this.setState({ search: this.state.name});
    fetch('https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/' + this.state.name, {
      headers: {
        'Accept': 'application/json',
        'X-Mashape-Key': 'umhsTza6z7mshV6ax0uG7zY5uY9dp180Mlhjsnh1ZK83NPtgzA'
      }
    }).then((response: any) => {
      if (!response.ok) {
        this.setState({ result: response.statusText });
        this.setState({ display: false });
        this.setState({ image: [] });
        this.setState({ loading: false });
        this.setState({ error: true });
      } else {
        response.json().then((data: any) => {
          const images = [];
          for (const key in data) {
            if (data[key].collectible !== false && data[key].collectible != null) {
              images.push(data[key].img);
            }
          }
          this.setState({ image: images });
          this.setState({ display: true });
          this.setState({ loading: false })
        })
      }
    })
  }

  public setName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value })
  }

  public render() {
    let cards = null;
    if (this.state.display) {
      cards = this.state.image.map((image, i) => {
        return (
          <CardMedia key={i}>
            <img src={image} />
          </CardMedia>
        )
      })
    } else if (!this.state.display && this.state.error) {
      cards = (
        <Card className="Error-card">
          <div>
            <p>No card matches {this.state.search} </p>
          </div>
        </Card>
      )
    }
    const display = this.state.loading ? <CircularProgress /> : cards
    return (
      <body>
        <div className="App">
          <header className="App-header">
            <div className="Header-text">HearthStone Card Finder</div>
          </header>
        </div>
        <div>
          <Card className="Main-card">
            <Input className="Input" placeholder="Card (e.g. 'Ysera')" value={this.state.name} onChange={this.setName} />
            <Button className="Search-button" variant="contained" onClick={this.getCard}>Search</Button>
          </Card>
        </div>
        <div>
          <Grid container={true} justify="center">
            {display}
          </Grid>
        </div>
      </body>
    );
  }
}
export default App;

