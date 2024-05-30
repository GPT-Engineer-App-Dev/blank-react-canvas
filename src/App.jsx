import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Events from "./pages/Events.jsx"; // Import the new Events page
import Venues from "./pages/Venues.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/events" element={<Events />} /> {/* Add the route for the Events page */}
      <Route path="/venues" element={<Venues />} />
      </Routes>
    </Router>
  );
}

export default App;
