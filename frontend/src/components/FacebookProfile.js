import React, { useEffect, useState } from "react";
import "./FacebookProfile.css";

export default function FacebookProfile() {
  const [post, setPost] = useState("");
  const [postList, setPostList] = useState([]);

  // useEffect para carregar os posts do backend ao montar o componente
  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then(response => response.json())
      .then(data => setPostList(data))
      .catch(error => console.error("Erro ao carregar posts:", error));
  }, []);

  const handlePost = (e) => {
    setPost(e.target.value);
  };

  const sendPost = () => {
    if (!post) return;

    // Envia o post para o backend com um POST request
    fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: post })
    })
      .then(response => response.json())
      .then(newPost => {
         setPostList(prev => [...prev, newPost]);
         setPost('');
      })
      .catch(error => console.error("Erro ao enviar post:", error));
  };

  // Renderiza os posts do backend
  const loadPosts = () => {
    return postList
      .slice() 
      .reverse() 
      .map((postObj) => (
        <div className="post" key={postObj.id}>
          <div className="post-header">
            <div>
              <div className="user-name">{postObj.user}</div>
              <div className="post-time">recent</div>
            </div>
          </div>
          <p>{postObj.message}</p>
        </div>
      ));
  };

  return (
    <div className="facebook-profile">
      {/* Cover Photo */}
      <div className="cover-photo">
        <img
          src="https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1200&q=80"
          alt="Cover"
        />
        <div className="profile-info">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="profile-picture"
          />
          <div className="profile-name">John Doe</div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="nav-bar">
        <div>Posts</div>
        <div>About</div>
        <div>Friends</div>
        <div>Photos</div>
        <div>More</div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        {/* Left Column */}
        <div className="left-column">
          <div className="intro-box">
            <h2>Intro</h2>
            <p>Web Developer at XYZ Company</p>
            <p>Lives in San Francisco, CA</p>
            <p>From New York, NY</p>
          </div>
          <div className="photos-box">
            <h2>Photos</h2>
            <div className="photo-grid">
              <img src="https://source.unsplash.com/random/100x100?sig=1" alt="Photo1" />
              <img src="https://source.unsplash.com/random/100x100?sig=2" alt="Photo2" />
              <img src="https://source.unsplash.com/random/100x100?sig=3" alt="Photo3" />
              <img src="https://source.unsplash.com/random/100x100?sig=4" alt="Photo4" />
              <img src="https://source.unsplash.com/random/100x100?sig=5" alt="Photo5" />
              <img src="https://source.unsplash.com/random/100x100?sig=6" alt="Photo6" />
            </div>
          </div>
        </div>

        {/* Right Column - Posts */}
        <div className="right-column">
          <div className="post-box">
            <textarea 
              placeholder="What's on your mind, John?" 
              onChange={handlePost} 
              value={post}
            ></textarea>
            <button onClick={sendPost}>Post</button>
          </div>

          <div className="posts">
            {loadPosts()}

            {/* Posts estáticos podem ser mantidos se desejar */}
            <div className="post">
              <div className="post-header">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="User"
                />
                <div>
                  <div className="user-name">John Doe</div>
                  <div className="post-time">2 hrs ago</div>
                </div>
              </div>
              <p>Had a great day exploring the city!</p>
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                alt="Post"
              />
            </div>

            <div className="post">
              <div className="post-header">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="User"
                />
                <div>
                  <div className="user-name">John Doe</div>
                  <div className="post-time">1 day ago</div>
                </div>
              </div>
              <p>Loving the new React features! 🚀</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
