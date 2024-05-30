import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { useVenues } from "../integrations/supabase/index.js";

const VenueCard = ({ venue }) => (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={4}>
    <Heading size="md" mb={2}>{venue.name}</Heading>
    <Text>Location: {venue.location}</Text>
    <Text>Description: {venue.description}</Text>
  </Box>
);

const Venues = () => {
  const { data: venues, isLoading, error } = useVenues();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading venues</Text>;

  return (
    <Container maxW="container.md" mt={4}>
      <Heading mb={6}>Venues</Heading>
      <VStack spacing={4}>
        {venues.map(venue => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </VStack>
    </Container>
  );
};

export default Venues;