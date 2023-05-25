function Movies(props){
    return props.movies.map((element)=>{return <h1>{element.description}</h1>})
}

export default Movies