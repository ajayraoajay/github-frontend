import React, { useState, useEffect } from "react";
import axios from "axios";

const RepositoryList = ({ user, onRepositoryClick, onFollowersClick }) => {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await axios.get(user.repos_url);
                setRepos(response.data); // Store repositories
            } catch (error) {
                console.error("Error fetching repositories:", error);
            }
        };
        fetchRepos();
    }, [user.repos_url]);

    return (
        <div style={{ padding: "20px" }}>
            <h2>{user.name || user.login}</h2>
            <img
                src={user.avatar_url}
                alt={user.login}
                style={{ width: "100px", borderRadius: "50%" }}
            />
            <p>{user.bio || "No bio available"}</p>
            <button onClick={onFollowersClick} style={{ margin: "10px 0" }}>
                View Followers
            </button>
            <h3>Repositories</h3>
            <ul>
                {repos.map((repo) => (
                    <li
                        key={repo.id}
                        onClick={() => onRepositoryClick(repo)}
                        style={{ cursor: "pointer", color: "blue", marginBottom: "10px" }}
                    >
                        {repo.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RepositoryList;
