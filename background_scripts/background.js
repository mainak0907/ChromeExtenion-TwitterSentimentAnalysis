let obj={}
let sentimentval=[]
chrome.runtime.onMessage.addListener((message)=>{
    if(message.type==="sentiment"){
        obj=message.data
    }
})
const count=(obj1)=>{
    let val=Object.values(obj1)
    let counts = val.reduce((acc,val)=>{
        acc[val==-1 ? String(val):val]++
        return acc
    },{"-1":0,0:0,1:0})

return Object.values(counts) 
}
chrome.runtime.onMessage.addListener((message)=>{
    if(message.type==="sentiment"){
        obj=message.data
    }
    else if (message.type === "reset") obj = {};
    sentimentval=count(obj)
    chrome.runtime.sendMessage({
        type: "sentimentval",
        data: sentimentval,
      })
})