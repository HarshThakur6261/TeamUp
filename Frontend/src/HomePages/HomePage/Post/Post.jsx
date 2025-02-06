import React from 'react';
import './posts.scss';

const Post = () => {
  return (
    <div className="post-container">
      <div className="post-header">
        <img
          src="/assets/uploadpic .png" // Placeholder for profile picture
          alt="User Avatar"
          className="avatar"
        />
        <div className="user-info">
          <h4 className="user-name">John Doe</h4>
          <p className="post-time">2 hours ago</p>
        </div>
      </div>
      <div className="post-content">
        <p>This is an example of a LinkedIn-like post. It contains text content, maybe a link or image!</p>
        {/* Add any media like images or videos here */}
        <img
          src="/assets/posts.webp"
          alt="Post Image"
          className="post-image"
        />
      </div>
      <div className="post-actions">
        <button className="action-btn">Like</button>
        <button className="action-btn">Comment</button>
        <button className="action-btn">Share</button>
      </div>
      <div className="post-header">
        <img
          src="/assets/uploadpic .png" // Placeholder for profile picture
          alt="User Avatar"
          className="avatar"
        />
        <div className="user-info">
          <h4 className="user-name">John Doe</h4>
          <p className="post-time">2 hours ago</p>
        </div>
      </div>
      <div className="post-content">
        <p>This is an example of a LinkedIn-like post. It contains text content, maybe a link or image!</p>
        {/* Add any media like images or videos here */}
        <img
          src="/assets/posts.webp"
          alt="Post Image"
          className="post-image"
        />
      </div>
      <div className="post-actions">
        <button className="action-btn">Like</button>
        <button className="action-btn">Comment</button>
        <button className="action-btn">Share</button>
      </div>
    </div>
  );
};

export default Post;
