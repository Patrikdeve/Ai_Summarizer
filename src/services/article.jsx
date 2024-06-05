import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const rapidapiKey = import.meta.env.VITE_RAPID_MY_KEY;



export const articleApi = createApi({
    reducerPath: 'articleApi', 
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/', 
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidapiKey)
            headers.set('X-RapidAPI-Host','article-extractor-and-summarizer.p.rapidapi.com')
        
            return headers;
        }
        
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    })
});//here wrapped the params.articleUrl because sometimes it is possible that url contains special character which 
//can cause the unexpected behaviour always wrap it with this component while dealing with the user create url

export const {useLazyGetSummaryQuery} = articleApi; 