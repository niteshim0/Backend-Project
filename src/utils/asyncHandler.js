const asyncHandler = (requestHandler)=> {
  (req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next))
    .catch((err)=>next(err))
  }
}












//Higher Order Function can take function as argument as well as return them
//next is used for middlewares 
//Way I(try-catch statement) of using some common function as utitlities and combine them in certain wrappers
/*const asyncHandler = (requestHandler)=> async(req,res,next)=>{
  try {
     await requestHandler(req,res,next);
  } catch (err) {
    res.status(err.code||500).json({
      success:false,
      message:err.message

    })
  }
}*/

