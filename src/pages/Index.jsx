import { Container, Box, Button, Heading, VStack, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../integrations/supabase/index.js";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h1" size="lg">Welcome</Heading>
        <Button colorScheme="teal" onClick={() => navigate('/create-event')}>Create Event</Button>
      </Box>
      <Image src="/images/duck.png" alt="A nice duck" borderRadius="lg" />
    </Container>
  );
};

export default Index;