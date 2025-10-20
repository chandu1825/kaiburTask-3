import React, {Component} from 'react';
import axios from 'axios';
import {Button, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {
    servers: [],
    newServerModal: false,
    delServerModal: false,
    findServerByIdModal: false,
    findServerByNameModal: false,
    newServerObject: {
      id: '',
      name: '',
      language: '',
      framework: ''
    },
    serverId: '',
    serverName: ''
  }
  componentWillMount() {
    this.__refreshServersCollection();
    toast.configure({
      autoClose: 4000,
      draggable: false,
    });
  }
  __refreshServersCollection() {
    axios.get('http://127.0.0.1:8080/servers/getServer').then((response) => {
      this.setState({
        servers: response.data
      })
    });
  }
  toggleNewServerModal() {
    this.setState({
      newServerModal: ! this.state.newServerModal
    });
  }
  toggleDelServerModal() {
    this.setState({
      delServerModal: ! this.state.delServerModal
    });
  }
  toggleFindServerByIdModal() {
    this.setState({
      findServerByIdModal: ! this.state.findServerByIdModal
    });
  }
  toggleFindServerByNameModal() {
    this.setState({
      findServerByNameModal: ! this.state.findServerByNameModal
    });
  }
  handleChangeId(event) {
    this.setState({serverId: event.target.value});
  }
  handleChangeName(event) {
    this.setState({serverName: event.target.value});
  }
  createServer() {
    axios.put('http://127.0.0.1:8080/servers/createServer', this.state.newServerObject).then((response) => {
    let {servers} = this.state;
    servers.push(this.state.newServerObject);
    this.setState({servers, newServerModal: false, newServerObject: {
      id: '',
      name: '',
      language: '',
      framework: ''
    }});
    toast.success(response.data);
    });
  }
  deleteServer(id) {
    axios.delete('http://127.0.0.1:8080/servers/deleteServer?id=' + id).then((response) => {
      this.setState({serverId: '', delServerModal: false});
      console.log(response.status);
      if (response.data == "Server deleted successfully!") {
        this.__refreshServersCollection();
        toast.success(response.data);
      } else {
        toast.error(response.data);
      }
    });
  }
  findServerById(id) {
    if (id == '') {
      this.setState({serverId: '', findServerByIdModal: false});
      this.__refreshServersCollection();
      return;
    }
    axios.get('http://127.0.0.1:8080/servers/getServer?id=' + id).then((response) => {
      this.setState({serverId: '', findServerByIdModal: false});
      this.setState({
        servers: [response.data]
      });
    }).catch(error => {
      toast.error("Server not found!");
  });
  }
  findServerByName(name) {
    if (name == '') {
      this.setState({serverName: '', findServerByNameModal: false});
      this.__refreshServersCollection();
      return;
    }
    axios.get('http://127.0.0.1:8080/servers/getServer?name=' + name).then((response) => {
      this.setState({serverName: '', findServerByNameModal: false});
      this.setState({
        servers: response.data
      });
    }).catch(error => {
      toast.error("Server not found!");
  });
  }
  render() {
    let servers = this.state.servers.map((server) => {
      return (
        <tr key={server.id}>
          <td>{server.id}</td>
          <td>{server.name}</td>
          <td>{server.language}</td>
          <td>{server.framework}</td>
           <td>
             <Button color="danger" size="sm" onClick={this.deleteServer.bind(this, server.id)}>DELETE</Button>
           </td> 
        </tr> 
      )
    });
    return (
      <div className="App container">
        <header>
          <center>
            <img 
                src="https://media.licdn.com/dms/image/v2/C4E1BAQHQas-74FSQAw/company-background_1536_768/company-background_1536_768/0/1583864622173?e=2147483647&v=beta&t=HOnskRrRDjNJNE3u7e9UHn4Zud2uEkEZB7wd75ES6k0" 
                alt="Kaiburr" 
                style={{ maxWidth: '300px', height: 'auto', margin: '20px 0' }}
            />
          </center>
        </header>
        <Table>
          <thead>
            <tr>
              <th>
                <Button className="my-3" size="sm" color="warning" onClick={this.toggleNewServerModal.bind(this)}>Create Server</Button>
              </th>
              <th>
               <Button className="my-3" size="sm" color="primary" onClick={this.toggleFindServerByIdModal.bind(this)}>Find By Id</Button>
              </th>
              <th>
               <Button className="my-3" size="sm" color="primary" onClick={this.toggleFindServerByNameModal.bind(this)}>Find By Name</Button>
              </th>
              <th>
               <Button className="my-3" size="sm" color="danger" onClick={this.toggleDelServerModal.bind(this)}>Delete By Id</Button>
              </th>
            </tr>
          </thead>
        </Table>
        <Modal isOpen={this.state.newServerModal} toggle={this.toggleNewServerModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewServerModal.bind(this)}>Create a new "server" object</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="id">ID</Label>
              <Input type="text" id="id" placeholder="Server ID eg. 123" value={this.state.newServerObject.id} onChange={(e) =>{
                let {newServerObject} = this.state;
                newServerObject.id = e.target.value;
                this.setState({newServerObject});
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" id="name" placeholder="Server Name eg. my centos" value={this.state.newServerObject.name} onChange={(e) =>{
                let {newServerObject} = this.state;
                newServerObject.name = e.target.value;
                this.setState({newServerObject});
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="language">Language</Label>
              <Input type="text" id="language" placeholder="Programming Language eg. java" value={this.state.newServerObject.language} onChange={(e) =>{
                let {newServerObject} = this.state;
                newServerObject.language = e.target.value;
                this.setState({newServerObject});
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="framework">Framework</Label>
              <Input type="text" id="framework" placeholder="Framework eg. spring boot" value={this.state.newServerObject.framework} onChange={(e) =>{
                let {newServerObject} = this.state;
                newServerObject.framework = e.target.value;
                this.setState({newServerObject});
              }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.createServer.bind(this)}>Create</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewServerModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.findServerByIdModal} toggle={this.toggleFindServerByIdModal.bind(this)}>
          <ModalHeader toggle={this.toggleFindServerByIdModal.bind(this)}>Find server by ID</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="id">ID</Label>
              <Input type="text" placeholder="ID of server to find" value={this.state.serverId} onChange={this.handleChangeId.bind(this)} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.findServerById.bind(this, this.state.serverId)}>Find</Button>{' '}
            <Button color="secondary" onClick={this.toggleFindServerByIdModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.findServerByNameModal} toggle={this.toggleFindServerByNameModal.bind(this)}>
          <ModalHeader toggle={this.toggleFindServerByNameModal.bind(this)}>Find servers by name</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" placeholder="Name of server to find eg. my centos" value={this.state.serverName} onChange={this.handleChangeName.bind(this)} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.findServerByName.bind(this, this.state.serverName)}>Find</Button>{' '}
            <Button color="secondary" onClick={this.toggleFindServerByNameModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.delServerModal} toggle={this.toggleDelServerModal.bind(this)}>
          <ModalHeader toggle={this.toggleDelServerModal.bind(this)}>Delete a "server" object</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="id">ID</Label>
              <Input type="text" placeholder="ID of server to delete eg. 123" value={this.state.serverId} onChange={this.handleChangeId.bind(this)} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.deleteServer.bind(this, this.state.serverId)}>Delete</Button>{' '}
            <Button color="secondary" onClick={this.toggleDelServerModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Language</th>
              <th>Framework</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {servers} 
          </tbody>
        </Table>
        <footer class="container">
          <div class="column-left">
            <span>P Varshith Naga </span> 
            <a href="https://www.linkedin.com/in/varshith-naga-2904a532b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">     
            </a>
          </div>
          <div class="column-center">
            <p>
              <a href="mailto:varshithnagaa34@gmail.com?Subject=Congratulations!" target="_top">varshithnagaa34@gmail.com </a> 
              <a href="https://github.com/Varshith34">     
              </a>
            </p>
          </div>
          <div class="column-right">
            <p>20 - 10 2025 Time around 7 PM</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;