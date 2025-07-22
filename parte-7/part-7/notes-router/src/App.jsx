// import {
//   BrowserRouter as Router,
//   Routes, Route, Link
// } from "react-router-dom"

// const Home = () => (
//   <div> <h2>TKTL notes app</h2> </div>
// )

// const Notes = () => (
//   <div> <h2>Notes</h2> </div>
// )

// const Users = () => (
//   <div> <h2>Users</h2> </div>
// )

// const App = () => {
//   const padding = {
//     padding: 5
//   }

//   return (
//     <Router>
//       <div>
//         <Link style={padding} to={"/"}>home</Link>
//         <Link style={padding} to={"/notes"}>notes</Link>
//         <Link style={padding} to={"/users"}>users</Link>
//       </div>

//       <Routes>
//         <Route path="/notes" element={<Notes />} />
//         <Route path="/users" element={<Users />} />
//         <Route path="/" element={<Home />} />
//       </Routes>

//       <div>
//         <i>Note app, Department of Computer Science 2024</i>
//       </div>
//     </Router>
//   )
// }

// export default App

import styled from 'styled-components'
// import { Container, TableBody, TableCell, TableContainer, TableRow, TextField, Alert, Table, AppBar, Toolbar, IconButton } from '@mui/material'
import { useState } from 'react'
// import { Alert, Button, Form, Nav, Navbar, Table } from 'react-bootstrap'

import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"

// Styled Components
const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`
const Input = styled.input`
  margin: 0.25em;
`

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  </div>
)

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Notes = ({ notes }) => (
  // // bootstrap example
  // <div>
  //   <h2>Notes</h2>
  //   <Table striped>
  //     <tbody>
  //       {notes.map(note =>
  //         <tr key={note.id}>
  //           <td>
  //             <Link to={`/notes/${note.id}`}>
  //               {note.content}
  //             </Link>
  //           </td>
  //           <td>
  //             {note.user}
  //           </td>
  //         </tr>
  //       )}
  //     </tbody>
  //   </Table>
  // </div>

  // MaterialUI Example
  <div>
    <h2>Notes</h2>

    <TableContainer>
      <Table>
        <TableBody>
          {notes.map(note =>
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>
                  {note.content}
                </Link>
              </TableCell>
              <TableCell>
                {note.user}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
)

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    navigate('/')
  }

  return (
    // // bootstrap example
    // <div>
    //   <h2>login</h2>
    //   <Form onSubmit={onSubmit}>
    //     <Form.Group>
    //       <Form.Label>username:</Form.Label>
    //       <Form.Control 
    //         type='text'
    //         name='username'
    //       />
    //     </Form.Group>
    //     <Form.Group>
    //       <Form.Label>password:</Form.Label>
    //       <Form.Control 
    //         type='password'
    //       />
    //     </Form.Group>
    //     <Button variant='primary' type='submit'>
    //       login
    //     </Button>
    //   </Form>
    // </div>

    // // MaterialUI Example
    // <div>
    //   <h2>login</h2>
    //   <form onSubmit={onSubmit}>
    //     <div>
    //       <TextField label='username' />
    //     </div>
    //     <div>
    //       <TextField label='password' type='password' />
    //     </div>
    //     <div>
    //       <Button variant='contained' color='primary' type='submit'>
    //         login
    //       </Button>
    //     </div>
    //   </form>
    // </div>

    // StyledComponents
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username:
          <Input />
        </div>
        <div>
          password:
          <Input type='password' />
        </div>
        <Button type="submit" primary=''>login</Button>
      </form>
    </div>

  )
}

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)

    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000);
  }

  const padding = {
    padding: 5
  }

  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  return (
    // // Bootstrap example
    // <div className='container'>
    //   <div>
    //     <div className='container'>
    //       {message &&
    //         <Alert variant='success'>
    //           {message}
    //         </Alert>
    //       }
    //     </div>
    //     <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
    //       <Navbar.Toggle aria-controls='responsive-navbar-nav' />
    //       <Navbar.Collapse id='responsive-navbar-nav' >
    //         <Nav className='me-auto'>
    //           <Nav.Link href='#' as={'span'}>
    //             <Link style={padding} to="/">home</Link>
    //           </Nav.Link>
    //           <Nav.Link href='#' as={'span'}>
    //             <Link style={padding} to="/notes">notes</Link>
    //           </Nav.Link>
    //           <Nav.Link href='#' as={'span'}>
    //             <Link style={padding} to="/users">users</Link>
    //           </Nav.Link>
    //           <Nav.Link href='#' as={'span'}>
    //             {user
    //               ? <em>{user} logged in</em>
    //               : <Link style={padding} to="/login">login</Link>
    //             }
    //           </Nav.Link>
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Navbar>
        
    //   </div>

    //   <Routes>
    //     <Route path="/notes/:id" element={<Note note={note} />} />
    //     <Route path="/notes" element={<Notes notes={notes} />} />
    //     <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
    //     <Route path="/login" element={<Login onLogin={login} />} />
    //     <Route path="/" element={<Home />} />
    //   </Routes>
      
    //   <div>
    //     <br />
    //     <em>Note app, Department of Computer Science 2023</em>
    //   </div>
    // </div>

    // //MaterialUI Example
    // <Container>
    //   <div>
    //     <div className='container'>
    //       {message &&
    //         <Alert severity='success'>
    //           {message}
    //         </Alert>
    //       }
    //     </div>
    //     <AppBar position="static">
    //       <Toolbar>
    //         <IconButton edge="start" color="inherit" aria-label="menu">
    //         </IconButton>
    //         <Button color="inherit" component={Link} to="/">
    //           home
    //         </Button>
    //         <Button color="inherit" component={Link} to="/notes">
    //           notes
    //         </Button>
    //         <Button color="inherit" component={Link} to="/users">
    //           users
    //         </Button>  
    //         {user
    //           ? <em>{user} logged in</em>
    //           : <Button color="inherit" component={Link} to="/login">
    //               login
    //             </Button>
    //         }                  
    //       </Toolbar>
    //     </AppBar>
    //   </div>

    //   <Routes>
    //     <Route path="/notes/:id" element={<Note note={note} />} />
    //     <Route path="/notes" element={<Notes notes={notes} />} />
    //     <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
    //     <Route path="/login" element={<Login onLogin={login} />} />
    //     <Route path="/" element={<Home />} />
    //   </Routes>
      
    //   <div>
    //     <br />
    //     <em>Note app, Department of Computer Science 2023</em>
    //   </div>
    // </Container>

    // Styled Components
    <Page>
      <Navigation>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
        {user
          ? <em>{user} logged in</em>
          : <Link style={padding} to="/login">login</Link>
        }
      </Navigation>
      
      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />  
        <Route path="/notes" element={<Notes notes={notes} />} />   
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />      
      </Routes>

      <Footer>
        <em>Note app, Department of Computer Science 2022</em>
      </Footer>
    </Page>
  )
}

export default App