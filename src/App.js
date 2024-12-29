import React, { useState } from "react";
import axios from "axios";
import UserSearch from "./components/UserSearch";
import RepositoryList from "./components/RepositoryList";
import RepositoryDetails from "./components/RepositoryDetails";
import FollowersList from "./components/FollowersList";
import "./App.css";


const App = () => {
    const [user, setUser] = useState(null);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [view, setView] = useState("search"); // 'search', 'repositories', 'followers', 'details'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchUserDetails = async (username) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.github.com/users/${username}`);
            setUser(response.data);
            setView("repositories"); // Navigate to repositories after fetching user
            setLoading(false);
        } catch (err) {
            console.error("Error fetching user details:", err);
            setError("Failed to fetch user details.");
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    switch (view) {
        case "repositories":
            return (
                <RepositoryList
                    user={user}
                    onRepositoryClick={(repo) => {
                        setSelectedRepo(repo);
                        setView("details");
                    }}
                    onFollowersClick={() => setView("followers")}
                    
                />
            );
        case "details":
            return (
                <RepositoryDetails
                    repo={selectedRepo}
                    onBack={() => setView("repositories")}
                />
            );
        case "followers":
            return (
                <FollowersList
                    user={user}
                    onFollowerClick={(username) => fetchUserDetails(username)}
                    onBack={() => setView("repositories")}
                />
            );
        default:
            return <UserSearch onSearch={(user) => { setUser(user); setView("repositories"); }} />;
    }
};

export default App;
