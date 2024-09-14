import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PostForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({ title: '', summary: '', content: '', image: null });
    const isEditing = !!id;

    useEffect(() => {
        if (isEditing) {
            axios.get(`http://127.0.0.1:8000/api/posts/${id}/`)
                .then(response => setPost(response.data))
                .catch(error => console.log(error));
        }
    }, [id, isEditing]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        setPost({ ...post, image: e.target.files[0] });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('summary', post.summary);
        formData.append('content', post.content);
        if (post.image) {
            formData.append('image', post.image);  // Add image file to form data
        }

        const method = isEditing ? 'put' : 'post';
        const url = isEditing ? `http://127.0.0.1:8000/api/posts/${id}/` : 'http://127.0.0.1:8000/api/posts/';

        axios({
            method: method,
            url: url,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(() => navigate('/'))
            .catch(error => console.log(error));
    };
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <form onSubmit={handleSubmit}>
            <button onClick={handleBack}>Back</button>
            <h2>{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={post.title}
                onChange={handleInputChange}
                required
            />
            <input
                type="text"
                name="summary"
                placeholder="Summary"
                value={post.summary}
                onChange={handleInputChange}
                required
            />
            <textarea
                name="content"
                placeholder="Content"
                rows={10}
                value={post.content}
                onChange={handleInputChange}
                required
            />
            <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
            />
            <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
        </form>
    );
};

export default PostForm;
