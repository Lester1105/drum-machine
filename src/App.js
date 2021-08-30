import {Button, Col, Container, Row} from 'react-bootstrap';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url:'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url:'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url:'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url:'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const Keyboard = ({ clip, volume, setRecording }) =>{
const [activ,setActiv]=React.useState(false);
  React.useEffect(()=>{
    document.addEventListener('keydown',handleKeyPress);
    return ()=>{
      document.removeEventListener('keydown',handleKeyPress);
    }
  }, []);
  const handleKeyPress=(e)=>{
    if(e.keyCode===clip.keyCode){
      playSound();
    }
  }

const playSound=()=>{
  const audioTag=document.getElementById(clip.keyTrigger)
  setActiv(true);
  setTimeout(()=>setActiv(false), 200);
  audioTag.currentTime=0;
  audioTag.play();
  audioTag.volume=volume;
  setRecording(prev=>prev + clip.id + ' ');
}  
return (
 
  <Button id={clip.id}className={`btn btn-secondary p-4 m-3 ${activ && 'btn-warning'} drum-pad`} size='sm' onClick={playSound}>
    <audio className='clip' id={clip.keyTrigger} src={clip.url}/>
    {clip.keyTrigger}
  </Button>
 
);
}

function App() {
 const[volume,setVolume]=React.useState(1);
 const[recording,setRecording]=React.useState('');

 const playRecording =()=>{

 let recordArray=recording.split(' ');
let index=0;
   const interval=setInterval(()=>{
    const audioTag=document.getElementById(recordArray[index]);
    audioTag.currentTime=0;
    audioTag.play();
    audioTag.volume=volume;
    index++;
   }, 300);
   setTimeout(
     ()=> clearInterval(interval),300 * recordArray.length -1);
 };

  return (
    <div className="App">
     <div id='drum-machine'>
       <Container>
         <Row>
       <h2>Drum Machine</h2>
       </Row>
       <Row className='buttons'>
        <Col>
       {bankOne.map(clip=>(<Keyboard key={clip.id} clip={clip} volume={volume} setRecording={setRecording}/>))}   
       </Col>
       <Col>
       <h4>Volume</h4>
       <input type='range' step='0.01' value={volume} onChange={e => setVolume(e.target.value)} max='1' min='0' className='w-50' />
   <h3 id='display'>{recording}</h3>
   {recording && (
     <>
     <Button onClick={playRecording} variant='success'>Play</Button>
     <Button onClick={()=>setRecording('')} variant='danger'>Clear</Button>
     </>
    
   )}
   </Col>
    </Row>
   </Container>
     </div>
    </div>
  );
}

export default App;
