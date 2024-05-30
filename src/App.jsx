import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Events from "./pages/Events.jsx"; // Import the new Events page
import CreateEvent from "./pages/CreateEvent.jsx"; // Import the new CreateEvent page
import Venues from "./pages/Venues.jsx"; // Import the new Venues page

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/events" element={<Events />} /> {/* Add the route for the Events page */}
      <Route path="/create-event" element={<CreateEvent />} /> {/* Add the route for the CreateEvent page */}
      <Route path="/venues" element={<Venues />} /> {/* Add the route for the Venues page */}
      </Routes>
    </Router>
  );
}

export default App;
