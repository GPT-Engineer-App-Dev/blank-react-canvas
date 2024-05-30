import { Container, Box } from "@chakra-ui/react";

const Index = () => {
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
    </Container>
  );
};

export default Index;