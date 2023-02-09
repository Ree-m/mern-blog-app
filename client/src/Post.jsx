const Post = () => {
    return ( 
        <div className="post">

        <div className="image">
          <img src="https://techcrunch.com/wp-content/uploads/2020/06/google-maps-ios-icon.jpg?w=990&crop=1" alt="" />
        </div>

        <div className="text">
          <h2>Google Maps launches Immersive View in five cities, will roll out glanceable directions soon</h2>
          <p className="info">
            <a href="" className="author">David Paszko</a>
            <time>2023-01-09</time>
          </p>
          <p>Google is launching new updates for Maps that are part of its plan to make the navigation app more immersive and intuitive for users, the company announced today at its event in Paris.</p>
        </div>

      </div>
     );
}
 
export default Post;