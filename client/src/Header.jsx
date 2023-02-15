
import { useEffect,useState,useContext } from "react";
import { Link } from "react-router-dom"
import { UserContext } from './UserContext';

const Header = () => {
  const {setUserInfo,userInfo}=useContext(UserContext)
  useEffect(() => {
    fetch("http://localhost:4000/profile/", {  //from here i will get username and id from tokens,forlogged in users,as tokens are for logged in users
      credentials: "include",
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
      })
    })

  }, [])
// To logout.the cookie needs to be invalid
  function logout(){
    fetch("http://localhost:4000/logout",{
      method:"POST",
      credentials:"include"
    })
    setUserInfo(null)
  }
const username =userInfo?.username
  return (
    <header>
    <Link to="/" className="logo">MyBlog</Link>
    <nav>
      {username && (
        <>
          <Link to="/create">Create new post</Link>
          <a onClick={logout}>Logout ({username})</a>
        </>
      )}
      {!username && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  </header>
   
  )
      }

export default Header;


