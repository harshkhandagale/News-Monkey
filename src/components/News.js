import React, {useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
const News =(props)=> {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+ string.slice(1);
  }
 
  

  const  updateNews= async ()=>{ 
    props.setProgress(10);
    let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1f793771cf0c47ca9b72eab7732e89e2&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
  document.title= `${capitalizeFirstLetter(props.category)}- NewsMonkey`
    updateNews();
  }, []);
  

  const handlePreviousClick = async () => { 
    setPage(page-1)
    updateNews();
  };

  const handleNextClick =async () => { 
    setPage(page+1)
    updateNews();
  };

  const fetchMoreData = async() => {
      setPage(page+1)
      let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1f793771cf0c47ca9b72eab7732e89e2&page=${page+1}&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)

  };

  return (
      <> 
        <h1 className="text-center " style={{margin:"35px 0px", marginTop:'90px'}}>NewsMonkey- Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}>
       <div className="container">
        <div className="row">
          {/* show this.this.state.articles.map only when loading becomes fales that is why we used !this.state.loading; */}
          { articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imageUrl={element.urlToImage}
                  url={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}/></div>
          })}
        </div>
      </div>
        </InfiniteScroll>


      </>
    )

}
News.defaultProps = {
  country:'in',
  pageSize:8,
  category:"general"
}
News.propTypes ={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News;
