import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Events from "./pages/Events.jsx"; // Import the new Events page
import CreateEvent from "./pages/CreateEvent.jsx"; // Import the new CreateEvent page
import Venues from "./pages/Venues.jsx"; // Import the new Venues page
import EventDetail from "./pages/EventDetail.jsx"; // Import the new EventDetail page
import Navbar from "./components/Navbar.jsx"; // Import the Navbar component

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/events" element={<Events />} /> {/* Add the route for the Events page */}
          <Route path="/create-event" element={<CreateEvent />} /> {/* Add the route for the CreateEvent page */}
          <Route path="/venues" element={<Venues />} /> {/* Add the route for the Venues page */}
          <Route path="/events/:eventId" element={<EventDetail />} /> {/* Add the route for the EventDetail page */}
        </Routes>
      </>
    </Router>
  );
}

export default App;
