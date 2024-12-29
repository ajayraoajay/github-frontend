import React, { useState, useEffect } from "react";
import axios from "axios";

const FollowersList = ({ user, onFollowerClick, onBack }) => {
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const fetchFollowers = async () => {
            const response = await axios.get(user.followers_url);
            setFollowers(response.data);
        };
        fetchFollowers();
    }, [user.followers_url]);

    return (
        <div className="container">
            <button onClick={onBack}>Back to Repositories</button>
            <h3>{user.name || user.login}'s Followers</h3>
            <ul>
                {followers.map((follower) => (
                    <li
                        key={follower.id}
                        onClick={() => onFollowerClick(follower.login)}
                    >
                        <img
                            src={follower.avatar_url}
                            alt={follower.login}
                            className="avatar"
                        />
                        {follower.login}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FollowersList;
