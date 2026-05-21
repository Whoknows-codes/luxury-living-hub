import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BottomNav } from "@/components/bottom-nav";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import PropertyDetails from "./pages/PropertyDetails";

function App() {
  return (
    <Router>
      {/* This wrapper forces the app to stay phone-sized on big screens */}
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-2xl sm:border-x sm:border-border overflow-x-hidden">
        
        {/* Main Content Area */}
        <div className="pb-20 flex-1"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/property/:propertyId" element={<PropertyDetails />} />
          </Routes>
        </div>
        
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;