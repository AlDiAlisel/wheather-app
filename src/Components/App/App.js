
import { useState, useEffect} from 'react'
import Weather from '../Weather/Weather'
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import './App.css';
import github from '../../github.png';
import linkedin from '../../linkedin.png'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '29ch',
      textAlign: 'center',
      verticalAlign: 'super',
     
    },
  },
  button:{
    textAlign:'buttom',
  },
  switch :{
    width:'60px',
  }
}));

function App() {
 const [valoreInput, setValoreInput]= useState ('')
 const [city, setCity] = useState('')
 const APIKEY = 'd1a0e9818bd599a5fd37abd9151a7791';
 const form = useStyles();
 const[state, setState]=useState({checkedA:false})
 const [tempo, setTempo] = useState({
     description:'',
     temp:'',
     humidity:'',
     vero: true,
     main:''
 })


  function ip(event){
    if(event.target !== undefined){
    setState({ ...state, [event.target.name]: event.target.checked });
    axios.get('https://api.astroip.co/5.61.219.180?api_key=3771004b-1944-43a8-aa17-3868279843d7')
    .then(response =>{
    const  clientIp = response.data;
    setCity(clientIp.geo.city);
      })
    }
 }
 

useEffect(()=>{
 axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKEY}`)
 .then(response => {
  const weather = response.data;
  setTempo({
    description: weather.weather[0].description,
    temp:Math.floor(weather.main.temp - 273.15),
    humidity:weather.main.humidity,
    vero:  true ? false: true,
    main:weather.weather[0].main
  })
 }, error => {
  console.log(error);
 });
 
 
},[city, tempo.vero]);


const handleChange = event => {
 setValoreInput(event.target.value);
}

function invia (){
    setCity(valoreInput); 
}

 return (
  <div className="App">
     <div className='header'>Developed by Alessio Farroni</div>
     <div className="bg"></div>
     <div className="bg bg2"></div>
     <div className="bg bg3"></div>
     <div className="app-input">
      <div className="content">
      <h1>Weather forecasts</h1>
      <form className={form.root} noValidate autoComplete="off">
      <span id='switchIp'>Serch by ip</span>
      <Switch 
        className={form.switch}
        checked={state.checkedA}
        onChange={ip}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <TextField id="standard-basic" label="weather forecasts, type your city" city = {city} onChange={handleChange}/>
      <Button className={form.button} color="primary" onClick={invia} >Search</Button>
      </form>
      <div className="app-weather">
    
      { tempo.main === ''? console.log('') : <Weather
      city={city}
      description={tempo.description}
      temp={tempo.temp}
      humidity={tempo.humidity}
      main={tempo.main}
      />   }
      </div>
    </div>
   
  </div>
  <footer className='footer'><div><a href='https://github.com/AlDiAlisel' className='icons' ><img src={github} /></a><a href='' className='icons'><img src={linkedin}/></a></div></footer>
  </div>
 )
}

export default App;
