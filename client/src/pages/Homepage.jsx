import Post from "../Post";
import { useEffect,useState} from "react"


const Homepage = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("http://localhost:4000/post").then(res=>{
            res.json()
            .then(posts=>{
                setPosts(posts)
                console.log(posts)
            })
        })
    },[])

    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post {...post}/>
            ))}
        </>
    );
}

export default Homepage;