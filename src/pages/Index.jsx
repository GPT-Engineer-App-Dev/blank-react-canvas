import { Container, Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box 
        as="canvas" 
        width={{ base: "100%", md: "80%" }} 
        height={{ base: "60vh", md: "80vh" }} 
        border="2px" 
        borderColor="gray.200" 
        borderRadius="md"
      />
    <Button mt={4} colorScheme="teal" onClick={() => navigate('/events')}>View Events</Button>
    </Container>
  );
};

export default Index;