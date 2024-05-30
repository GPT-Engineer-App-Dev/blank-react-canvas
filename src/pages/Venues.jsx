import { Box, Container, Heading, Text, VStack, Button, useToast, FormControl, FormLabel, Input, Textarea, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useVenues, useAddVenue, useDeleteVenue, useUpdateVenue } from "../integrations/supabase/index.js";
import { useState } from "react";

const VenueCard = ({ venue, onDelete, onUpdate }) => (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={4} width="100%" maxWidth="600px">
    <Heading size="md" mb={2}>{venue.name}</Heading>
    <Text>Location: {venue.location}</Text>
    <Text>Description: {venue.description}</Text>
    <Button mt={2} colorScheme="red" onClick={() => onDelete(venue.id)}>Delete</Button>
    <Button mt={2} colorScheme="blue" onClick={() => onUpdate(venue)}>Update</Button>
  </Box>
);

const Venues = () => {
  const { data: venues, isLoading, error } = useVenues();
  const addVenue = useAddVenue();
  const deleteVenue = useDeleteVenue();
  const updateVenue = useUpdateVenue();
  const toast = useToast();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [venueIdToUpdate, setVenueIdToUpdate] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddVenue = async () => {
    try {
      await addVenue.mutateAsync({ name, location, description });
      toast({
        title: "Venue added.",
        description: "The venue has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setName("");
      setLocation("");
      setDescription("");
      onClose();
    } catch (error) {
      toast({
        title: "Error.",
        description: "There was an error adding the venue.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteVenue = async (id) => {
    try {
      await deleteVenue.mutateAsync(id);
      toast({
        title: "Venue deleted.",
        description: "The venue has been deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error.",
        description: "There was an error deleting the venue.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpdateVenue = async () => {
    try {
      await updateVenue.mutateAsync({ id: venueIdToUpdate, name, location, description });
      toast({
        title: "Venue updated.",
        description: "The venue has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setName("");
      setLocation("");
      setDescription("");
      setIsUpdating(false);
      setVenueIdToUpdate(null);
      onClose();
    } catch (error) {
      toast({
        title: "Error.",
        description: "There was an error updating the venue.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEditClick = (venue) => {
    setName(venue.name);
    setLocation(venue.location);
    setDescription(venue.description);
    setIsUpdating(true);
    setVenueIdToUpdate(venue.id);
    onOpen();
  };

  const handleAddClick = () => {
    setName("");
    setLocation("");
    setDescription("");
    setIsUpdating(false);
    setVenueIdToUpdate(null);
    onOpen();
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading venues</Text>;

  return (
    <Container maxW="container.md" mt={4}>
      <Heading mb={6}>Venues</Heading>
      <VStack spacing={4}>
        {venues.map(venue => (
          <VenueCard key={venue.id} venue={venue} onDelete={handleDeleteVenue} onUpdate={handleEditClick} />
        ))}
      </VStack>
      <Button mt={6} colorScheme="teal" onClick={handleAddClick}>Add Venue</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isUpdating ? "Update Venue" : "Add Venue"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" isRequired>
              <FormLabel>Venue Name</FormLabel>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id="location" isRequired>
              <FormLabel>Venue Location</FormLabel>
              <Input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Venue Description</FormLabel>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={isUpdating ? handleUpdateVenue : handleAddVenue}>
              {isUpdating ? "Update Venue" : "Add Venue"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Venues;