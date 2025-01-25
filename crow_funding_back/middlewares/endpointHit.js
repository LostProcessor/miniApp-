const EndpointHit = (res,req,next) => {
    console.log('i have hit ')
    next()
}


export default EndpointHit