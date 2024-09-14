import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/posts/${id}/`)
            .then(response => {
                setPost(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching post:', error);
                setError('An error occurred while fetching the post.');
                setLoading(false);
            });
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/api/posts/${id}/`)  // Ensure the full API path
            .then(() => {
                console.log("Post deleted successfully");
                navigate('/');  // Redirect to homepage after deletion
            })
            .catch(error => {
                console.error("Error deleting post:", error);
                setError('An error occurred while deleting the post.');
            });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!post) return <p>Post not found</p>;

    return (
        <div className="post-container">
            <button onClick={handleBack}>Back</button>
            <h1>{post.title}</h1>
            {post.image && <img src={`http://127.0.0.1:8000${post.image}`} alt={post.title} />} {/* Display image if exists */}
            <p>{post.summary}</p>
            <p>{post.content}</p>
            <Link to={`/edit-post/${id}`} className='edit'>Edit</Link>
            <button onClick={handleDelete}>Delete</button> {/* Delete button calls the function */}
        </div>
    );
};

export default PostPage;
