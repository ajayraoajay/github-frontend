import React, { useState } from "react";
import UserSearch from "./components/UserSearch";
import RepositoryList from "./components/RepositoryList";
import RepositoryDetails from "./components/RepositoryDetails";

const App = () => {
    const [user, setUser] = useState(null);
    const [selectedRepo, setSelectedRepo] = useState(null);

    if (selectedRepo) {
        return (
            <RepositoryDetails repo={selectedRepo} onBack={() => setSelectedRepo(null)} />
        );
    }

    if (user) {
        return (
            <RepositoryList
                user={user}
                onRepositoryClick={setSelectedRepo}
                onFollowersClick={() => console.log("Followers clicked")}
            />
        );
    }

    return <UserSearch onSearch={setUser} />;
};

export default App;
