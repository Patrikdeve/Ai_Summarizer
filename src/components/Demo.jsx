import React from 'react'
import {useState, useEffect} from 'react'
import {copy, linkIcon, loader, tick} from "../assets"
import 'bootstrap/dist/css/bootstrap.css'; 
import { useLazyGetSummaryQuery } from '../services/article';


const Demo = () => {
    const [article, setArticle] = useState({
        url: '', 
        summary: ''
    }); 
    //To save the all articles history we are going to do store it
    const [allArticles, setAllArticles] = useState([]); 
    
    const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery(); 
    
    //To store the data and not to lose after reload or lost connection we use useEffect hook here
    useEffect(()=> {
        const articlesFromLocalStorage = JSON.parse(
            localStorage.getItem('articles')
        )

        if(articlesFromLocalStorage) {
            setAllArticles(articlesFromLocalStorage); 
        }
    }, []);
    
    
    const handleSubmit = async(e) => {
        e.preventDefault(); 
        const {data} = await getSummary({articleUrl : article.url})
        
        if(data?.summary) {
            const newArticle = {...article, summary:data.summary}; 
            const updatedArticles = [newArticle, ...allArticles]
            
            setAllArticles(updatedArticles); 
            setArticle(newArticle); 

            localStorage.setItem('articles', JSON.stringify(updatedArticles));
            
        }
    
    }   
    
    const [copied, setCopied] = useState("");
    const handleCopy =(copyUrl) => {
        setCopied(copyUrl); 
        navigator.clipboard.writeText(copyUrl); 
        setTimeout(()=> setCopied(false), 3000); 
    }

    const handleDelete =(index) => {
        const deleteArticle = allArticles; 
        deleteArticle.splice(index, 1); 
        setAllArticles(deleteArticle); 
        localStorage.setItem('articles', JSON.stringify(deleteArticle));
    }
  return (
    <section className='mt-16 w-full max-w-xl'>
        {/* <Search/> */}
        <div className='flex flex-col w-full gap-2'>
            <form className='relative flex justify-center items-center'
            onSubmit={ handleSubmit}
            >
                <img src={linkIcon} alt="link Icon" className='absolute left-0 my-2 ml-3 w-5' />
                <input type='url' placeholder='Enter a URL...' value = {article.url}
                onChange={ (e) => setArticle({...article, 
                    url: e.target.value
                })}
                required
                className='url_input peer'
                />

                <button 
                type='submit'
                className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'
                >
                    <i class="bi bi-send-fill"></i>
                    
                </button>
            </form>
            
            <div className='flex flex-col max-h-60 gap-1 overflow-y-auto'>
                {
                    allArticles.map((article, index) => (
                        <div key = {`link-${index}`}
                        onClick = {() => setArticle(article)}
                        className='link_card '
                        >
                            <div className='copy_btn' onClick={() => handleCopy(article.url)}>
                                <img src = {copied === article.url ? tick: copy} alt = "copy_icon" 
                                className='w-[40%] h-[40%] object-contain' />
                             </div>
                             <p className='flex-1 border border-black font-satoshi text-blue-700 fond-medium text-md truncate'>
                                {article.url}
                             </p>
                             <div onClick={() => handleDelete(article.index)}
                             className='w-7 h-7 object-contain'>
                                 <i class="bi bi-trash2-fill"></i>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className='my-10 max-w-full flex justify-center items-center'>
                {isFetching ? (
                    <img src= {loader} alt="loading..." className='w-20 h-20 object-contain' />
                ): error ? (<p className='font-inter font-bold text-black text-center'>
                    Sorry For Inconvinience, we are working on it....
                    <br/>
                    <span className='font-satoshi font-normal text-gray-700'>
                        {error?.data?.error}
                    </span>
                    
                    </p>) : (
                        article.summary && (
                            <div className='flex flex-col gap-3'>
                                <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                                    Article <span className = 'blue_gradient'>Summary</span>
                                </h2>

                                <div className='summary_box'>
                                    <p className='font-inter font-medium text-md text-gray-700'>
                                        {article.summary}
                                    </p>
                                </div>

                            </div>
                        )
                    )
                }
        </div>
    </section>
  )
}

export default Demo
