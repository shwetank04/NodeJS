//MiddleWare which only works for api starting with /admin
const userAuth = (req,res,next)=>{
    const token = 'xyz'
    const isAdminAuthorized = token === 'xyz'
    if(isAdminAuthorized){
        next();
    }
    else{
        res.status(401).send("Not valid")
    }
}

module.exports ={
    userAuth
}
