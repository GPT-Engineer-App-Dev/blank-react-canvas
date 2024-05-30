import { Box, Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEvents, useAddEventSignup } from "../integrations/supabase/index.js";

const EventCard = ({ event }) => {
  const addEventSignup = useAddEventSignup();
  const navigate = useNavigate();

  const handleSignup = () => {
    addEventSignup.mutate({ event_id: event.id, name: "User Name", email: "user@example.com" });
  };

  const handleViewDetails = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={4} width="100%" maxWidth="600px">
      <Heading size="md" mb={2}>{event.name}</Heading>
      <Text>Date: {new Date(event.date).toLocaleDateString()}</Text>
      <Text>Description: {event.description}</Text>
      <Button mt={4} colorScheme="teal" onClick={handleSignup}>Sign Up</Button>
      <Button mt={4} colorScheme="blue" onClick={handleViewDetails}>View Details</Button>
    </Box>
  );
};

const Events = () => {
  const { data: events, isLoading, error } = useEvents();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading events</Text>;

  return (
    <Container maxW="container.md" mt={4}>
      <Heading mb={6}>Events</Heading>
      <VStack spacing={4}>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </VStack>
    </Container>
  );
};

export default Events;