import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Homepage = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/posts/')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div className="container posts-container">
            <h1>Blog Posts</h1>
            <button onClick={() => navigate('/new-post')} className='createbutton'>Create New Post</button>
            <div className='post'>
            {posts.length > 0 ? (
                posts.map(post => (
                    
                        <div key={post.id} className="post-card">
                            {post.image && (
                                <img
                                    src={`http://127.0.0.1:8000${post.image}`}
                                    alt={post.title}
                                    className="post-image"
                                />
                            )}
                            <h2>{post.title}</h2>
                            <p>{post.summary}</p>
                            <p><strong>Published:</strong> {new Date(post.publication_date).toLocaleDateString()}</p>
                            <Link to={`/post/${post.id}`}>Read More</Link>
                        </div>
                    
                ))
            
            ) : (
                <p>No Posts available</p>
            )}
            </div>
           
        </div>
    );
};

export default Homepage;
