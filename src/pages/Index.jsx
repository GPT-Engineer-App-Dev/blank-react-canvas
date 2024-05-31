import { Container, Box, Button, Heading, VStack, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAddCanvasState, useLoadCanvasState } from "../integrations/supabase/index.js";

const Index = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [canvasState, setCanvasState] = useState(null);
  const addCanvasState = useAddCanvasState();
  const { data: loadedState } = useLoadCanvasState({ event_id: 1 }); // Filtering by event_id

  useEffect(() => {
    if (loadedState && loadedState.length > 0) {
      const ctx = canvasRef.current.getContext("2d");
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = loadedState[0].state;
    }
  }, [loadedState]);

  const saveCanvasState = async (event_id) => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL();
    try {
      await addCanvasState.mutateAsync({ event_id, state: dataUrl });
      alert("Canvas state saved successfully!");
    } catch (error) {
      alert("Error saving canvas state.");
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h1" size="lg">Welcome</Heading>
        <Button colorScheme="teal" onClick={() => navigate('/create-event')}>Create Event</Button>
      </Box>
      <canvas ref={canvasRef} width={500} height={500} style={{ border: "1px solid black" }}></canvas>
      <Button mt={4} colorScheme="teal" onClick={saveCanvasState}>Save Canvas State</Button>
      <Image src="/images/duck.png" alt="A nice duck" borderRadius="lg" />
    </Container>
  );
};

export default Index;