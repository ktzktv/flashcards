import React from 'react';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {render:"select", side:"Front", front:"", back:"", deck:"", card:[{front:"Est-ce que ____etes prets?", back:"vous"}, {front:"il ____que j'y aille", back:"faut"}, {front:"il est ____et sauf", back:"sain"}], index:0, answer:"", placeholder:"Answer", history:[], flip:true} 
    }
    
    render() {
        return <div className="App"><header className="App-header">
        {this.renderSwitch()}
        </header></div>    
    }
    
    renderSwitch() {
        switch(this.state.render) {
            case "study": return this.renderStudy()
            case "deck": return this.renderDeck()       
            case "word": return this.renderWord()         
            case "select": return this.renderSelect()    
            default: return <p>error</p>
        }    
    }










    renderStudy() { return <> <div className="StudyCard">
        <Button variant="dark" onClick={(e) => this.setState({flip:!this.state.flip})}>Flip Card?</Button>
        {this.flipCard()}
        <form onSubmit=
                        {(e) => { e.preventDefault(); if(e.target[0].value.toLowerCase() == this.state.card[this.state.index].back.toLowerCase()) 
                                {this.setState({index:(this.state.index+1)%3, answer:"", placeholder:"Answer", flip:true})} 
                                else { this.setState({answer:"", placeholder:"Incorrect"}) } } }>
                <input class="inputfield" type="text" value={this.state.answer} onChange={(e) => this.setState({answer:e.target.value})} placeholder={this.state.placeholder} />
                 </form> </div>
       <p /><p /><p /><p /><p /><Button onClick={() => this.setState({render: "word", history:[...this.state.history, "study"]})}>Add more cards to deck</Button>
    <p /> <Button onClick={() => this.setState({render:"select", history:[...this.state.history, "study"]})}>Study another deck</Button>
    <p /><p />{this.backButton()}
    </>
    }









    renderDeck() { return <>
        <p>Make a new Deck</p>
        <h3>Enter the title of your Deck</h3>
        <form onSubmit={(e) => { e.preventDefault(); if(e.target[0].value==="") {} else this.setState({render: "word", history:[...this.state.history, "deck"]}) }} >
                <input onChange={(e) => { e.preventDefault(); this.setState({deck:e.target.value}) }} type="text" placeholder="French, Spanish, etc..." />
        </form>
        <p /><p />{this.backButton()}
        </>    
    }






    renderWord() { return  <>
        <p>Add a Card to {this.state.deck}</p>
        <div className="StudyCard">
        <ButtonGroup>
        <Button variant={this.state.side=="Front"? "dark" : "light"} onClick={() => this.setState({side: "Front"})}>Front</Button>
        <Button variant={this.state.side=="Back"? "dark" : "light"} onClick={() => this.setState({side: "Back"})}>Back</Button></ButtonGroup>
        <form onSubmit={(e) => {e.preventDefault(); 
                                if(this.state.side=="Front") { this.setState({side:"Back"})}
                                else { if(this.state.front==""||this.state.back=="") {this.setState({side:"Front"})} else { this.setState({side:"Front", front:"", back:""}); alert("pretend the card has been added to the selected deck; actually adding the card is not implemented yet")}}} }
        width="300px">
                <input class="inputfield" type="text" value={this.state.side =="Front"? this.state.front : this.state.back }
                                   onChange={(e) => { e.preventDefault();
                                                     if(this.state.side=="Front") {this.setState({front:e.target.value})} 
                                                    else {this.setState({back:e.target.value})} }}
                placeholder={this.state.side + " of Card"} />
        </form></div>
        <p /><p />
        <div> <Button onClick={() => this.setState({render: "select", history:[...this.state.history, "word"]})}>Study another Topic</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={() => { this.setState({render: "study", history:[...this.state.history, "word"]}); alert("The only available deck is french. Pretend as though these were the cards you entered.")}}>Study this Deck</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button onClick={() => this.setState({render: "deck", history:[...this.state.history, "word"]})}>Make another Deck</Button> </div>
        <p /><p />{this.backButton()}
        </>
    }







    renderSelect(){ 
        return <>
               <p>Choose the Subject</p>
               <div class="scroll">
               <Button onClick={() => this.setState({render: "study", history:[...this.state.history, "select"], deck:"French"})}>French</Button><p />
               <Button onClick={()=> alert("Currently, the only example deck is French.")}>Spanish</Button><p />
               <Button onClick={()=> alert("Currently, the only example deck is French.")}>Italian</Button><p />
               <Button onClick={()=> alert("Currently, the only example deck is French.")}>German</Button><p />
               <Button onClick={()=> alert("Currently, the only example deck is French.")}>Latin</Button><p />
               <Button onClick={()=> alert("Currently, the only example deck is French.")}>Java</Button><p />
               <Button onClick={()=> alert("Currently, the only example deck is French.")}>Japanese</Button><p />
               <Button onClick={()=> alert("Currently, the only example deck is French.")}>Javanese</Button><p />
               <Button onClick={()=> alert("Currently, the only example deck is French.")}>Lorem</Button><p />
               <Button onClick={()=> alert("Currently, the only example deck is French.")}>Ipsum</Button><p />
               <Button onClick={()=> alert("Currently, the only example deck is French.")}>Virology</Button><p />
               <Button onClick={()=> alert("Currently, the only example deck is French.")}>Topic</Button><p />
               </div> 
                <p />
               <form onSubmit={(e) => alert("The list of decks is filtered by the search term, case-independant")} >
                <input type="text" placeholder="Search" />
                 </form>
                <p />
               <Button onClick={() => this.setState({render:"deck", history:[...this.state.history, "select"]})}>Make a new deck</Button>
               <p /><p />{this.backButton()}
               </>
    }
    
    backButton() {
        if(this.state.history[0]===undefined) { return <p></p> }
        else{ return <Button onClick={() => this.setState({render:this.state.history.pop()})}>Back</Button>}
    }

    flipCard() {
        if (this.state.flip) { return <p> {this.state.card[this.state.index].front} </p>} 
        else { return <p> {this.state.card[this.state.index].back} </p>}
    }
}

export default App;
