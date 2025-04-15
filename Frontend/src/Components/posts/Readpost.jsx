import React from 'react'
import "./Readpost.scss"
import Postcard from './postcard'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
function Readpost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all posts
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:8000/images', {
                    withCredentials: true,
                });
                setPosts(res.data);
            } catch (err) {
                console.error('Failed to load posts:', err);
            }
            finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>   <div className='nave'>
            <ul style={{ cursor: "pointer" }}>
                <li>Art & Design</li>
                <li>Music</li>
                <li>Cooking</li>
                <li>Handycrafs</li>
                <li>Sports</li>
                <li>Programming</li>
                <li>Tech</li>
                <li>Instruments</li>
                <li>Lifestyle</li>
            </ul>

        </div>
            <hr />
            <div className='postbox' style={{ padding: "15px", display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "30px", flexWrap: "wrap" }}>
                {loading ? (<div style={{
                    width: "100%",
                    height: "50vh", // adjust height as needed
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Spinner animation="grow" />
                </div>) : (
                    posts.map((post) => {

                        return (
                            <Postcard key={post._id}
                                caption={post.caption}
                                username={post.user.username}
                                picture={post.user.picture}
                                image={post.img} />
                        )

                    })
                )}

            </div>
        </>

    )
}

export default Readpost
