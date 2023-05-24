function Weather(props){
   return props.weather.map((element)=>{return <h1>{element.description}</h1>})
}

export default Weather