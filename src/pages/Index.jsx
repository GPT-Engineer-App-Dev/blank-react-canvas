import { Container, Box, Button, Heading, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../integrations/supabase/index.js";

const EventCard = ({ event }) => (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={4}>
    <Heading size="md" mb={2}>{event.name}</Heading>
    <Text>Date: {new Date(event.date).toLocaleDateString()}</Text>
    <Text>Description: {event.description}</Text>
  </Box>
);

const Index = () => {
  const navigate = useNavigate();
  const { data: events, isLoading, error } = useEvents();

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h1" size="lg">Events</Heading>
        <Button colorScheme="teal" onClick={() => navigate('/create-event')}>Create Event</Button>
      </Box>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error loading events</Text>}
      <VStack spacing={4} width="100%">
        {events && events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </VStack>
    </Container>
  );
};

export default Index;