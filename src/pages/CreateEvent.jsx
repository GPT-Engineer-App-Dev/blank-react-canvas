import { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Textarea, VStack, useToast } from "@chakra-ui/react";
import { useAddEvent } from "../integrations/supabase/index.js";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const addEvent = useAddEvent();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEvent.mutateAsync({ name, date, description });
      toast({
        title: "Event created.",
        description: "Your event has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error.",
        description: "There was an error creating the event.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" mt={4}>
      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Event Name</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl id="date" isRequired>
            <FormLabel>Event Date</FormLabel>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </FormControl>
          <FormControl id="description" isRequired>
            <FormLabel>Event Description</FormLabel>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">Create Event</Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default CreateEvent;