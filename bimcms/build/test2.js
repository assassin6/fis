

const a=data=>{
  console.log(data)
}
const b = (data)=>{
  return new Promise((resolve,reject)=>{
    
    resolve(data)
    setTimeout(()=>{
      console.log(data)
    },1000)
  })
}
a(2)
b(2).then(data=>{
  console.log(data+1)
})