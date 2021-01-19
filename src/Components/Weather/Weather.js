
import { useState, useEffect} from 'react'
import {Grid,  makeStyles, Card, CardActionArea,CardActions, CardContent, CardMedia, Typography,Switch} from '@material-ui/core';
import axios from 'axios';
import './Weather.css'

const useStyles = makeStyles({
    root: {
      maxWidth: 400,
    },
    media :{
      width: 230,
    }
  });


 
function Weatherr(props) {
    const uri =`https://translation.googleapis.com/language/translate/v2`;
    const {temp, humidity,city,description,main} = props;
    const [state, setState]=useState({'checkedA':false})
    const [traduzione, setTraduzione]=useState();
    const [info, setInfo]=useState([]);
    const[infoEn, setInfoEn]=useState(['the weather is :', ' the temperature is :', 'humidity  :']);
    const[img, setImg]=useState();
    const card= useStyles();
    
     const handleChange = (event) => {
        setState({...state,[event.target.name] :event.target.checked});
        axios.post(
            uri,
            {},
            {
              params: {
                q:  infoEn[0] + infoEn[1] + infoEn[2] + description,
                target: 'it',
                key: process.env.REACT_APP_API_KEY
              }
            }
          )
        .then(response =>{
            const x = response.data.data.translations[0].translatedText
            let affermazioni = x.split(' ');
            let a =affermazioni.slice(0,2);
            let b = affermazioni.slice(3,6);
            let c=affermazioni.slice(6,7);
            let d = affermazioni.slice(7)
            setInfo([a.map(x=> ' ' + x),b.map(x => ' ' + x), c.map(x => ' ' + x )])
            setTraduzione(d.map(x => ' ' + x));
        })
      };

   useEffect(()=>{
    if(main === 'Mist'){
      setImg('https://media.giphy.com/media/Xev6MDHoxXrUAQZDMa/giphy.gif')
     } if(main==='Thunderstorm'){
         setImg('https://media.giphy.com/media/Q8bCsT2A4cuVM8C93X/giphy.gif')
     }if(main==='	Drizzle'){
       setImg('https://media.giphy.com/media/SVqwRUVQqYDz9wHCHF/giphy.gif')
     }if(main==='Rain'){
       setImg('https://media.giphy.com/media/3ov9jCEFMBtCy54q6Q/giphy.gif')
     }if(main==='Snow'){
       setImg('https://media.giphy.com/media/3iCuUglCmyJSTQ1l3w/giphy.gif')
     }if(main==='Fog' || main==='Smoke'){
       setImg('https://media.giphy.com/media/ejB3NVGzbPKTUONSN3/giphy.gif')
     }if(main==='Clear'){
       setImg('https://media.giphy.com/media/UnyblOs6hGx9Mli7jq/giphy.gif')
     }if(main==='Clouds'){
       setImg('https://media.giphy.com/media/VDMgMo6U4LFuioPGFn/giphy.gif')
     }
   },[main])
       
  
    
 return (
    <Grid   container direction='column' justify='flex-start' alignItems='center'>
      <Card className={card.root}  >
       <CardActionArea>
          <CardMedia
          className={card.media}
          component="img"
          alt="Weather"
          image={img}
          title="Weather"
         
         />
          <CardContent>
           <Typography gutterBottom variant="h5" component="h2">{city}</Typography>
           <Typography variant="body2" color="textSecondary" component="p">{state.checkedA && info !== undefined? info[0]: infoEn[0]}  {state.checkedA? traduzione: description}</Typography>
           <Typography>{state.checkedA && info !== undefined? info[1]: infoEn[1] }{temp + ' °C'}</Typography>
           <Typography>{state.checkedA && info !== undefined ? info[2] : infoEn[2] } {humidity + ' %'}</Typography>
         </CardContent>
       </CardActionArea>
          <CardActions>
          English<Switch
          onChange={handleChange}
          checked={state.checkedA} 
          name="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          />Italian
      
          </CardActions>
      </Card> 
    </Grid>
 )
}

export default Weatherr

