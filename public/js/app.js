const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = searchElement.value;
    //console.log(location);
    //url = 'http://localhost:3000/weather?address='+location;

    url = '/weather?address=' + location;

    document.getElementById('dispWeather').innerHTML='Loading..';
    document.getElementById('dispError').innerHTML='';


fetch(url).then((response) => {
    response.json().then((data)=>{
        if (data.error) {
            //console.log(data.error);    
            document.getElementById('dispError').innerHTML=data.error.toString();
            document.getElementById('dispWeather').innerHTML='';
        } else {
            //console.log(data.Placename);        
            //console.log(data.Forecast);            
            document.getElementById('dispWeather').innerHTML=data.Forecast;   
            document.getElementById('dispError').innerHTML='';         
        }
    })
})
})