import { Box, Flex, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="teal.500" px={4} py={2}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <NavLink to="/" style={{ color: 'white', fontWeight: 'bold' }}>Home</NavLink>
        <NavLink to="/events" style={{ color: 'white', fontWeight: 'bold' }}>Events</NavLink>
        <NavLink to="/create-event" style={{ color: 'white', fontWeight: 'bold' }}>Create Event</NavLink>
        <NavLink to="/venues" style={{ color: 'white', fontWeight: 'bold' }}>Venues</NavLink>
      </Flex>
    </Box>
  );
};

export default Navbar;