import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Box, Flex, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Events from "./pages/Events.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import Venues from "./pages/Venues.jsx";

const Navbar = () => (
  <Box bg="teal.500" p={4}>
    <Flex justify="space-around">
      <Link as={NavLink} to="/" color="white" _hover={{ textDecoration: "none", color: "gray.200" }}>Home</Link>
      <Link as={NavLink} to="/events" color="white" _hover={{ textDecoration: "none", color: "gray.200" }}>Events</Link>
      <Link as={NavLink} to="/create-event" color="white" _hover={{ textDecoration: "none", color: "gray.200" }}>Create Event</Link>
      <Link as={NavLink} to="/venues" color="white" _hover={{ textDecoration: "none", color: "gray.200" }}>Venues</Link>
    </Flex>
  </Box>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/events" element={<Events />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/venues" element={<Venues />} />
      </Routes>
    </Router>
  );
}

export default App;