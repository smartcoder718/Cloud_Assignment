import { memo } from 'react'
import { useNavigate } from "react-router-dom"

import Header from "../../components/Header"
import useFetch from "../../Hooks/useFetch"
import BlogList from "./BlogList"

import "./home.css"

/**
 * description : this is the page to broswer blogs from the API
 */

const url = 'https://jsonplaceholder.typicode.com/posts'

const Home = memo(() => {
    const navigate = useNavigate();

    //fetch random dog image
    const { response, loading, error } = useFetch(url)

    return (
        <div >
            <Header pageName={"Home"} />

            {loading && <p className="loading-bar"> Loding...</p>}
            {error && <p className="wrong-text text-danger"> Something went wrong</p>}
            {response &&

                <div>
                    <BlogList data={response} />

                    <div className="add-post-div">
                        <button onClick={() => { navigate('/add-post'); }} type="submit" className="btn w-100 h-100 mt-0 btn-submit">
                            Add New Post
                        </button>
                    </div>


                </div>
            }
        </div>
    )
})

export default Home;