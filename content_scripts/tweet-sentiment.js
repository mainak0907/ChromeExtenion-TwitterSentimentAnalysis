tweetsentiment={}
tweets= document.querySelectorAll('[data-testid="tweetText"]')
const anayzesentiments=(text)=>{
    const sentiments = [1, -1, 0]
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)] 
    tweetsentiment[text]=sentiment
    chrome.runtime.sendMessage({
        type:"sentiment",
        data:tweetsentiment,
    })
    return sentiment
}
const categorizeTweet=(tweet) =>{
    if(tweet.hasAttribute("checked")) return
    const span=document.querySelectorAll("span")
    const spans=[]
    span.forEach((text)=>{
        spans.push(text.innerText)
    })
    const text=spans.join(" ")
    // text analysed before
    if(text in tweetsentiment){
        const s=tweetsentiment[text]
        tweet.setAttribute("checked",s)
        return
    }
    // text not analysed before
    const k=anayzesentiments(text)
    tweet.setAttribute("checked",k)
}
const categorizeAllTweets =(tweets)=>{
    tweets.forEach((tweet)=>{
        categorizeTweet(tweet)
    })
}
const doSentimentAnalysis=()=> {
    tweets = document.querySelectorAll('[data-testid="tweetText"]');
    categorizeAllTweets(tweets);
  }
document.addEventListener("scroll",()=>{
    doSentimentAnalysis()
})
chrome.runtime.onMessage.addListener((message)=>{
    if ( message.type === "resetSentiment"){
        tweetsentiment={}
    }
})