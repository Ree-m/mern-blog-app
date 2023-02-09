const LoginPage = () => {
    return (  
       <form className="login">
        <h1>Login</h1>
        <input type="text" placeholder="username"/>
        <input type="text" placeholder="password"/>
        <button className="btn">Login</button>

       </form>
    );
}
 
export default LoginPage;