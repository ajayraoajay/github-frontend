import React, { useState, useEffect } from "react";
import axios from "axios";

const FollowersList = ({ user, onFollowerClick, onBack }) => {
    const [followers, setFollowers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await axios.get(user.followers_url);
                setFollowers(response.data); // Store followers data
            } catch (err) {
                console.error("Error fetching followers:", err);
                setError("Failed to fetch followers.");
            }
        };
        fetchFollowers();
    }, [user.followers_url]);

    return (
        <div style={{ padding: "20px" }}>
            <button onClick={onBack} style={{ marginBottom: "20px" }}>
                Back to Repositories
            </button>
            <h3>{user.name || user.login}'s Followers</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {followers.map((follower) => (
                    <li
                        key={follower.id}
                        onClick={() => onFollowerClick(follower.login)}
                        style={{ cursor: "pointer", marginBottom: "10px" }}
                    >
                        <img
                            src={follower.avatar_url}
                            alt={follower.login}
                            style={{ width: "50px", borderRadius: "50%", marginRight: "10px" }}
                        />
                        {follower.login}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FollowersList;
