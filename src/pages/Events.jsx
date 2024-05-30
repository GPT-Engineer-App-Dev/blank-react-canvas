import { Box, Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { useEvents, useAddEventSignup } from "../integrations/supabase/index.js";

const EventCard = ({ event }) => {
  const addEventSignup = useAddEventSignup();

  const handleSignup = () => {
    addEventSignup.mutate({ event_id: event.id, name: "User Name", email: "user@example.com" });
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={4}>
      <Heading size="md" mb={2}>{event.name}</Heading>
      <Text>Date: {new Date(event.date).toLocaleDateString()}</Text>
      <Text>Description: {event.description}</Text>
      <Button mt={4} colorScheme="teal" onClick={handleSignup}>Sign Up</Button>
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