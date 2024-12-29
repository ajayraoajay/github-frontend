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
            // Fetch user data from GitHub API
            const response = await axios.get(`https://api.github.com/users/${username}`);
            onSearch(response.data); // Pass the user data to the parent
        } catch (error) {
            setError("User not found");
        }
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>GitHub User Search</h1>
            <input
                type="text"
                placeholder="Enter GitHub Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ padding: "8px", width: "250px", marginRight: "10px" }}
            />
            <button onClick={handleSearch} style={{ padding: "8px 16px" }}>
                Search
            </button>
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>
    );
};

export default UserSearch;
