import React from 'react';
import './posts.scss';

const Post = () => {
  return (
    <div className="post-container">
      {/* Post 1 */}
      <div className="post">
        <div className="post-header">
          <img
            src="/assets/uploadpic .png" 
            alt="User Avatar"
            className="avatar"
          />
          <div className="user-info">
            <h4 className="user-name">John Doe <span className="user-title">• Software Engineer at TechCorp</span></h4>
            <p className="post-time">2 hours ago • <span className="visibility">🌎 Public</span></p>
          </div>
          <button className="more-options">⋯</button>
        </div>
        
        <div className="post-content">
          <p>Just launched our new product! 🚀 After months of hard work, our team is proud to present the next generation of productivity tools. #Tech #Innovation</p>
          <div className="post-media">
            <img
              src="/assets/posts.webp"
              alt="Post Image"
              className="post-image"
            />
            <div className="media-caption">
              <h4>Introducing ProductX</h4>
              <p>The ultimate solution for your workflow optimization</p>
              <span className="domain">productx.tech</span>
            </div>
          </div>
        </div>
        
        <div className="post-stats">
          <div className="reactions">
            <span className="reaction-icons">👍❤️😮</span>
            <span>124</span>
          </div>
          <div className="comments-shares">
            <span>23 comments • 7 shares</span>
          </div>
        </div>
        
        <div className="post-actions">
          <button className="action-btn">
            <span className="icon">👍</span> Like
          </button>
          <button className="action-btn">
            <span className="icon">💬</span> Comment
          </button>
          <button className="action-btn">
            <span className="icon">🔄</span> Share
          </button>
          <button className="action-btn">
            <span className="icon">✉️</span> Send
          </button>
        </div>
      </div>
      <div className="post">
        <div className="post-header">
          <img
            src="/assets/uploadpic .png" 
            alt="User Avatar"
            className="avatar"
          />
          <div className="user-info">
            <h4 className="user-name">John Doe <span className="user-title">• Software Engineer at TechCorp</span></h4>
            <p className="post-time">2 hours ago • <span className="visibility">🌎 Public</span></p>
          </div>
          <button className="more-options">⋯</button>
        </div>
        
        <div className="post-content">
          <p>Just launched our new product! 🚀 After months of hard work, our team is proud to present the next generation of productivity tools. #Tech #Innovation</p>
          <div className="post-media">
            <img
              src="/assets/posts.webp"
              alt="Post Image"
              className="post-image"
            />
            <div className="media-caption">
              <h4>Introducing ProductX</h4>
              <p>The ultimate solution for your workflow optimization</p>
              <span className="domain">productx.tech</span>
            </div>
          </div>
        </div>
        
        <div className="post-stats">
          <div className="reactions">
            <span className="reaction-icons">👍❤️😮</span>
            <span>124</span>
          </div>
          <div className="comments-shares">
            <span>23 comments • 7 shares</span>
          </div>
        </div>
        
        <div className="post-actions">
          <button className="action-btn">
            <span className="icon">👍</span> Like
          </button>
          <button className="action-btn">
            <span className="icon">💬</span> Comment
          </button>
          <button className="action-btn">
            <span className="icon">🔄</span> Share
          </button>
          <button className="action-btn">
            <span className="icon">✉️</span> Send
          </button>
        </div>
      </div>

      {/* Post 2 */}
      <div className="post">
        {/* Similar structure as Post 1 */}
      </div>
    </div>
  );
};

export default Post;