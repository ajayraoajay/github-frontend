import React, { useState } from "react";
import axios from "axios";

const UserSearch = ({ onSearch }) => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!username) {
            setError("Username is required");
            return;
        }
        setError("");
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            onSearch(response.data);
        } catch (error) {
            setError("User not found");
        }
    };

    return (
        <div className="container center">
            <h1>GitHub User Search</h1>
            <input
                type="text"
                placeholder="Enter GitHub Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default UserSearch;
