import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import './styles/globals.css';
import './styles/dashboard.css';
import './styles/contacts.css';
import './styles/lists.css';
import './styles/tags.css';
import './styles/settings.css';

// Pages
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Lists from "./pages/Lists";
import Tags from "./pages/Tags";
import Settings from "./pages/Settings"

const App = () => {
    const [currentTab, setCurrentTab] = useState("/dashboard");

    const handleHashChange = () => {
        const hash = window.location.hash.replace("#", "");
        const route = hash || "/dashboard";

        switch (route) {
            case "/dashboard":
            case "/contacts":
            case "/lists":
            case "/settings":
            case "/tags":
                setCurrentTab(route);
                break;
            default:
                setCurrentTab("/dashboard");
                window.location.hash = "#/dashboard";
        }

        window.scrollTo(0, 0);
    };

    useEffect(() => {
        window.addEventListener("hashchange", handleHashChange);
        handleHashChange();
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const renderContent = () => {
        switch (currentTab) {
            case "/dashboard":
                return <Dashboard />;
            case "/contacts":
                return <Contacts />;
            case "/lists":
                return <Lists />;
            case "/tags":
                return <Tags />;
            case "/settings":
                return <Settings />;
            default:
                return <Dashboard />;
        }
    };

    return <div className="animate-fade-in">{renderContent()}</div>;
};

const container = document.getElementById("rapid-crm-root");
const root = createRoot(container);
root.render(<App />);
