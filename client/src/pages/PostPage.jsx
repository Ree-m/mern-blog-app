import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {format }from "date-fns";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';


const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null)
    const { id } = useParams()
    const { userInfo } = useContext(UserContext)

    useEffect(() => {
        // console.log(id)
        fetch(`http://localhost:4000/post/${id}`).then(res => {
            res.json().then(postInfo => {
                setPostInfo(postInfo)
            })
        })

    }, [])

    if (!postInfo) return ""

    // else return everything below
    return (
        <div className="postPage">
            <h1>{postInfo.title}</h1>
            <time>{format(new Date(postInfo.createdAt), 'MMM dd, yyyy k:mm:ss')}</time>

            <div className="author">
                <span>by</span>
                <Link to={"/"}>{postInfo.author.username}</Link>

            </div>
            {userInfo.id === postInfo.author._id && (
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>

                        Edit this post
                    </Link>
                </div>

            )}

            <div className="post-image">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
            </div>

            <p dangerouslySetInnerHTML={{ __html: postInfo.content }} />

        </div>
    );
}

export default PostPage;