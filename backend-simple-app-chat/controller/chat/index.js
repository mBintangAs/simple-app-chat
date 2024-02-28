const index = async (req,res)=>{
res.json({message:"hallo"})
}
const store = async (req,res)=>{
res.send("")
}
module.exports = {index,store}    