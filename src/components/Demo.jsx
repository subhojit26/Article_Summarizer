import React from "react";
import { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick, share } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, {error, isFetching}]= useLazyGetSummaryQuery();

  const [copy1, setCopy] = useState("");

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles"));
    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSumbit = async (e) => {
    e.preventDefault();
    const {data} = await getSummary({ articleUrl: article.url });
    if(data?.summary){
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }

  };

  const handleCopy = (copyUrl) => {
    setCopy(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="w-full flex flex-col gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSumbit}
        >
          <img
            src={linkIcon}
            alt="link"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter the article link"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value})}
            required
            className="url_input peer"
          />
          <button type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
            <img src={share} alt="share" className="w-10 h-10" />
          </button>
        </form>

          {/* Browse History */}

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
            key={`link-${index}`}  
            onClick={()=>setArticle(item)}
            className="link_card"
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img
                  src={copy1 === item.url ? tick : copy}
                  alt={copy1 === item.url ? "tick_icon" : "copy_icon"}
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">{item.url}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Display Result */}
          <div className="my-10 max-w-full flex justify-center items-center">
            {isFetching ? (
              <img src={loader} alt="loader" className="w-10 h-10 object-contain"/>
            ) : error ? (
              <p className="text-red-500 font-inter font-bold text-center">An error occurred <br/>
                <span className="font-satoshi font-normal text-center text-gray-700">{error?.data?.error}</span>
              </p>
            
            ):(
              article.summary && (
                <div className="flex flex-col gap-3">
                  <h2 className="font-satoshi font-bold text--gray-600 text-xl">
                    Article <span className="blue-gradient">Summary</span>
                  </h2>
                  <div className="summary_box">
                    <p className="text-sm font-satoshi text-gray-700">{article.summary}</p>

                  </div>
                  </div>
              )
            )}

          </div>

    </section>
  );
};

export default Demo;
