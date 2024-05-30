import { useParams } from "react-router-dom";
import { Box, Container, Heading, Text, VStack, Divider } from "@chakra-ui/react";
import { useEvents, useComments } from "../integrations/supabase/index.js";

const EventDetail = () => {
  const { eventId } = useParams();
  const { data: events, isLoading: eventsLoading, error: eventsError } = useEvents();
  const { data: comments, isLoading: commentsLoading, error: commentsError } = useComments();

  if (eventsLoading || commentsLoading) return <Text>Loading...</Text>;
  if (eventsError) return <Text>Error loading event details</Text>;
  if (commentsError) return <Text>Error loading comments</Text>;

  const event = events.find(event => event.id === parseInt(eventId));
  const eventComments = comments.filter(comment => comment.event_id === parseInt(eventId));

  if (!event) return <Text>Event not found</Text>;

  return (
    <Container maxW="container.md" mt={4}>
      <Heading mb={4}>{event.name}</Heading>
      <Text>Date: {new Date(event.date).toLocaleDateString()}</Text>
      <Text>Description: {event.description}</Text>
      <Divider my={6} />
      <Heading size="md" mb={4}>Comments</Heading>
      <VStack spacing={4} align="start">
        {eventComments.length > 0 ? (
          eventComments.map(comment => (
            <Box key={comment.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <Text>{comment.content}</Text>
              <Text fontSize="sm" color="gray.500">Posted on: {new Date(comment.created_at).toLocaleDateString()}</Text>
            </Box>
          ))
        ) : (
          <Text>No comments yet.</Text>
        )}
      </VStack>
    </Container>
  );
};

export default EventDetail;