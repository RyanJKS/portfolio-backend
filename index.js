const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
/*{path:'.env'} */
const PORT = process.env.PORT || 5000
const CRYPTO_API_URL = "https://finnhub.io/api/v1"

const app =express()
app.use(cors());

/* app.METHOD(PATH,HANDLER) */
app.get('/crypto-quote/:symbol',(req,res)=>{
    const symbolGet = req.params.symbol
    const options = {
      method: 'GET',
      url: `${CRYPTO_API_URL}/quote?symbol=${symbolGet}&token=${process.env.REACT_APP_CRYPTO_KEY}`,
    };

    axios.request(options).then(function (response) {
        res.json([symbolGet,response.data]);
      }).catch(function (error) {
        res.json(error)
      });
    
    })

/*front end to back end using url parameters de-structure */
app.get('/stock-lookup/:symbolSearch',(req,res)=>{
  const symbolLookup = req.params.symbolSearch
  const options = {
    method: 'GET',
    url: `${CRYPTO_API_URL}/search?q=${symbolLookup}&token=${process.env.REACT_APP_CRYPTO_KEY}`
  }

  axios.request(options).then(function (response){
    res.json(response.data)
  }).catch(function (error) {
    console.error(error);
  });
})

app.get('/stock-prices/:symbol/:resolutionSpec/:fromTime/:toTime',(req,res)=>{
  const symbolSearch = req.params.symbol
  const resolutionSearch = req.params.resolutionSpec
  const fromSearch = req.params.fromTime
  const toSearch = req.params.toTime

  const options = {
    method: 'GET',
    url: `${CRYPTO_API_URL}/stock/candle?symbol=${symbolSearch}&resolution=${resolutionSearch}&from=${fromSearch}&to=${toSearch}&token=${process.env.REACT_APP_CRYPTO_KEY}`,
  }
  axios.request(options).then(function (response){
    res.json(response.data)
  }).catch(function (error) {
    console.error(error);
  });

})

app.get('/get-meme', (req,res)=>{
  const options ={
    method:'GET',
    url:`https://api.humorapi.com/memes/random?api-key=${process.env.REACT_APP_MEME_API_KEY}`
  }
  axios.request(options).then(function (response){
    res.json(response.data)
  }).catch(function (error){
    console.error(error)
  })
})

app.get('/get-news/:topic',(req,res) =>{
  const topic = req.params.topic
  const not_these_sources = "makeuseof.com, reddit.com, latimes.com, yourstory.com, techcrunch.com, indiatoday.in.com, fool.com.au, scroll.in, prnewswire.com, business2community.com, kktv.com, kwch.com"
  const options = {
    method: 'GET',
    url: 'https://api.newscatcherapi.com/v2/search',
    params: {q: topic, not_sources: not_these_sources , lang: 'en', sort_by: 'relevancy', page: '1'},
    headers: {
      'x-api-key': process.env.REACT_APP_NEWS_API_KEY
    }
  };

  axios.request(options).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}
)

app.get('/coordinates-weather/:city',(req,res)=>{
  const city = req.params.city
  const options = {
    method: 'GET',
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_LOCATION_API_KEY}`
  }
  axios.request(options).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    console.error(error);
  });
})


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})
