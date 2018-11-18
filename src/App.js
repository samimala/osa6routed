import React from 'react'
import {BrowserRouter as Router, Link, NavLink, Route, Redirect} from 'react-router-dom'
import { Container, Table, Grid, Image, Menu } from 'semantic-ui-react'

class MenuSemantic extends React.Component {
  state = {}

  menuStyle = {
    backgroundColor: 'darkblue',
    color: 'white',
    fontSize: 20
    }  
    
  handleItemClick = (e, {name}) => {
    console.log('onClick: ', e)
    this.setState({activeItem: name})
  }

  activeStyle = (active) => ({ color: active?"red":"white" })

  render() {
    const activeItem = this.state
    return(
      <Menu inverted style={this.menuStyle}>
        <Menu.Item
          as={Link}
          name="anecdotes"
          to='/'
          onClick={this.handleItemClick}
          style={{color: this.state.activeItem==="anecdotes"?"red":"white"}}>
          Anecdotes
        </Menu.Item>
        <Menu.Item
          as={Link}
          name="create new"
          to='/create'
          onClick={this.handleItemClick}
          style={{color: this.state.activeItem==="create new"?"red":"white"}}>
          Create new
        </Menu.Item>
        <Menu.Item
          as={Link}
          name="about"
          to='/about'
          onClick={this.handleItemClick}
          style={{color: this.state.activeItem==="about"?"red":"white"}}>
          About
        </Menu.Item>
      </Menu>
    )
  }
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table>
      <Table.Body>
        {anecdotes.map(anecdote => 
          <Table.Row key={anecdote.id}>
            <Table.Cell >
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>  
  </div>
)


const Notification = ({text}) => {
  const notifyStyle = {
    color: 'red',
    fontStyle: 'bold',
    marginLeft: 15,
    fontSize: 20
  }
  
  return (
      <div style={notifyStyle}>
      {text}
    </div>
  )
}


const OneAnecdote = ({anecdote}) => {
  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>
          <h2>{anecdote.content} by {anecdote.author}</h2>
        </Grid.Column>
        <Grid.Column>
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  VOTES
                </Table.Cell>
              </Table.Row>
              <Table.Row style={{fontSize:30, color: 'green'}}>
                <Table.Cell>
                {anecdote.votes}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid columns={2}>
      <Grid.Row>
      <Grid.Column>
      <p>According to Wikipedia:</p>
      
      <em>An anecdote is a brief, revealing account of an individual person or an incident. 
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
        An anecdote is "a story with a point."</em>

      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </Grid.Column>
    <Grid.Column>
      <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Ada_Byron_aged_seventeen_%281832%29.jpg/1200px-Ada_Byron_aged_seventeen_%281832%29.jpg" alt="Ada Byron aged seventeen (1832).jpg"/>
      By <span lang="en">Unknown</span> - Scanned from The Calculating Passion of Ada Byron by Joan Baum. Originally from the Lovelace-Byron Collection., Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=19076813">Link</a>
    </Grid.Column>
    </Grid.Row>
  </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push("/")
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

  
class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.setState({ notification: `A new anecdote "${anecdote.content}" created!`})
    setTimeout(
      ()=>this.setState({notification: ''}),
      10000
    )
  }

  anecdoteById = (id) => 
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <h1>Software anecdotes</h1>
          <Router>
            <div>
              <MenuSemantic />
              <Notification text={this.state.notification}/>
              <Route exact path="/" render={()=> <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route exact path="/about" render={()=><About /> } />
              <Route exact path="/create" render={({history})=><CreateNew history={history} addNew={this.addNew}/>} />
              <Route exact path="/anecdotes/:id" render={({match})=><OneAnecdote anecdote={this.anecdoteById(match.params.id)}/>} />
            </div>  
          </Router>
        <Footer />
      </Container>
    );
  }
}

export default App;
