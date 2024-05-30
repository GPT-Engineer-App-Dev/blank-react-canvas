import { useParams } from "react-router-dom";
import { Box, Container, Heading, Text, VStack, Divider, FormControl, FormLabel, Textarea, Button, useToast, IconButton, HStack } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown, FaLaugh, FaSadTear } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useEvents, useComments, useAddComment } from "../integrations/supabase/index.js";

const EventDetail = () => {
  const { eventId } = useParams();
  const { data: events, isLoading: eventsLoading, error: eventsError } = useEvents();
  const { data: comments, isLoading: commentsLoading, error: commentsError } = useComments();

  const addComment = useAddComment();
  const toast = useToast();
  const [commentContent, setCommentContent] = useState("");
  const [feedbackContent, setFeedbackContent] = useState("");
  const [wordCloudData, setWordCloudData] = useState([]);
  const [reactions, setReactions] = useState({});

  useEffect(() => {
    if (comments) {
      const wordFrequency = {};
      comments.forEach(comment => {
        const words = comment.content.split(/\s+/);
        words.forEach(word => {
          word = word.toLowerCase();
          if (wordFrequency[word]) {
            wordFrequency[word]++;
          } else {
            wordFrequency[word] = 1;
          }
        });
      });

      const wordCloudArray = Object.keys(wordFrequency).map(word => ({
        text: word,
        value: wordFrequency[word],
      }));

      setWordCloudData(wordCloudArray);
    }
  }, [comments]);

  if (eventsLoading || commentsLoading) return <Text>Loading...</Text>;
  if (eventsError) return <Text>Error loading event details</Text>;
  if (commentsError) return <Text>Error loading comments</Text>;

  const event = events.find(event => event.id === parseInt(eventId));
  const eventComments = comments.filter(comment => comment.event_id === parseInt(eventId));

  if (!event) return <Text>Event not found</Text>;

  const handleAddComment = async () => {
    try {
      await addComment.mutateAsync({ content: commentContent, event_id: event.id });
      toast({
        title: "Comment added.",
        description: "Your comment has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setCommentContent("");
    } catch (error) {
      toast({
        title: "Error.",
        description: "There was an error adding your comment.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      await addComment.mutateAsync({ content: feedbackContent, event_id: event.id });
      toast({
        title: "Feedback submitted.",
        description: "Your feedback has been submitted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFeedbackContent("");
    } catch (error) {
      toast({
        title: "Error.",
        description: "There was an error submitting your feedback.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleReaction = (commentId, emoji) => {
    setReactions(prevReactions => ({
      ...prevReactions,
      [commentId]: emoji,
    }));
  };

  return (
    <Container maxW="container.md" mt={4}>
      <Heading mb={4}>{event.name}</Heading>
      <Text>Date: {new Date(event.date).toLocaleDateString()}</Text>
      <Text>Description: {event.description}</Text>
      <Divider my={6} />
      <Heading size="md" mb={4}>Comments</Heading>
      <Text mb={4}>Share your thoughts and opinions about this event.</Text>
      <VStack spacing={4} align="start">
        {eventComments.length > 0 ? (
          eventComments.map(comment => (
            <Box key={comment.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <Text>{comment.content}</Text>
              <Text fontSize="sm" color="gray.500">Posted on: {new Date(comment.created_at).toLocaleDateString()}</Text>
              <HStack spacing={2} mt={2}>
                <IconButton
                  icon={<FaThumbsUp />}
                  aria-label="Like"
                  onClick={() => handleReaction(comment.id, 'like')}
                  colorScheme={reactions[comment.id] === 'like' ? 'teal' : 'gray'}
                />
                <IconButton
                  icon={<FaThumbsDown />}
                  aria-label="Dislike"
                  onClick={() => handleReaction(comment.id, 'dislike')}
                  colorScheme={reactions[comment.id] === 'dislike' ? 'teal' : 'gray'}
                />
                <IconButton
                  icon={<FaLaugh />}
                  aria-label="Laugh"
                  onClick={() => handleReaction(comment.id, 'laugh')}
                  colorScheme={reactions[comment.id] === 'laugh' ? 'teal' : 'gray'}
                />
                <IconButton
                  icon={<FaSadTear />}
                  aria-label="Sad"
                  onClick={() => handleReaction(comment.id, 'sad')}
                  colorScheme={reactions[comment.id] === 'sad' ? 'teal' : 'gray'}
                />
              </HStack>
            </Box>
          ))
        ) : (
          <Text>No comments yet.</Text>
        )}
      </VStack>
      <Divider my={6} />
      <Heading size="md" mb={4}>Word Cloud</Heading>
      <Box mb={4} p={4} borderWidth="1px" borderRadius="lg" width="100%" height="300px" overflow="hidden" position="relative">
        {wordCloudData.map((word, index) => (
          <Text
            key={index}
            position="absolute"
            fontSize={`${word.value * 10}px`}
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {word.text}
          </Text>
        ))}
      </Box>
      <Divider my={6} />
      <Heading size="md" mb={4}>Add a Comment</Heading>
      <Text mb={4}>Join the discussion by adding your comment below.</Text>
      <FormControl id="comment" isRequired>
        <FormLabel>Comment</FormLabel>
        <Textarea value={commentContent} onChange={(e) => setCommentContent(e.target.value)} />
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={handleAddComment}>Add Comment</Button>
      <Divider my={6} />
      <Heading size="md" mb={4}>Submit Feedback</Heading>
      <Text mb={4}>Provide your feedback to help us improve future events.</Text>
      <Box as="form" onSubmit={handleFeedbackSubmit} mt={6}>
        <FormControl id="feedback" isRequired>
          <FormLabel>Feedback</FormLabel>
          <Textarea value={feedbackContent} onChange={(e) => setFeedbackContent(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="teal" mt={4}>Submit Feedback</Button>
      </Box>
    </Container>
  );
};

export default EventDetail;