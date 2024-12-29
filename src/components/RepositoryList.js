import React, { useState, useEffect } from "react";
import axios from "axios";

const RepositoryList = ({ user, onRepositoryClick, onFollowersClick }) => {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchRepos = async () => {
            const response = await axios.get(user.repos_url);
            setRepos(response.data);
        };
        fetchRepos();
    }, [user.repos_url]);

    return (
        <div className="container">
            <h2>{user.name || user.login}</h2>
            <img className="avatar" src={user.avatar_url} alt={user.login} />
            <p>{user.bio || "No bio available"}</p>
            <button onClick={onFollowersClick}>View Followers</button>
            <h3>Repositories</h3>
            <ul>
                {repos.map((repo) => (
                    <li key={repo.id} onClick={() => onRepositoryClick(repo)}>
                        {repo.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RepositoryList;
