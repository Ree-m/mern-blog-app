import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <header>
        <a href="" className="logo">MyBlog</a>
        <nav>
          <a href="">Login</a>
          <a href="">Register</a>
        </nav>
      </header>

      <div className="post">
        <img src="https://techcrunch.com/wp-content/uploads/2020/06/google-maps-ios-icon.jpg?w=990&crop=1" alt="" />
        <h2>Google Maps launches Immersive View in five cities, will roll out glanceable directions soon</h2>
        <p>Google is launching new updates for Maps that are part of its plan to make the navigation app more immersive and intuitive for users, the company announced today at its event in Paris.</p>
      </div>

      <div className="post">
        <img src="https://techcrunch.com/wp-content/uploads/2020/06/google-maps-ios-icon.jpg?w=990&crop=1" alt="" />
        <h2>Google Maps launches Immersive View in five cities, will roll out glanceable directions soon</h2>
        <p>Google is launching new updates for Maps that are part of its plan to make the navigation app more immersive and intuitive for users, the company announced today at its event in Paris.</p>
      </div>

      <div className="post">
        <img src="https://techcrunch.com/wp-content/uploads/2020/06/google-maps-ios-icon.jpg?w=990&crop=1" alt="" />
        <h2>Google Maps launches Immersive View in five cities, will roll out glanceable directions soon</h2>
        <p>Google is launching new updates for Maps that are part of its plan to make the navigation app more immersive and intuitive for users, the company announced today at its event in Paris.</p>
      </div>

      
    </main>
  )
}

export default App
