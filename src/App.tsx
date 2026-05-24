import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BottomNav } from "@/components/bottom-nav";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import PropertyDetails from "./pages/PropertyDetails";
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <Router>
      <div className="flex min-h-screen hidden w-full flex-col bg-background overflow-x-hidden">
        
        {/* I added the desktop wrapper right here! 
            Now every page is automatically constrained and centered on big screens. */}
        <div className="pb-24 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"> 
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
      <Analytics />
    </Router>
  );
}

export default App;