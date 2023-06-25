import {
  Box,
  Container,
  Heading,
  Flex,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./components/Column";
import DarkModeIconButton from "./components/DarkModeIconButton";
import { ColumnType } from "./utils/enums";
import SummarizeButton from "./components/SummarizeButton";

function App() {
  return (
    <header>
      <Box
        position="relative"
        p={5}
        roundedBottom="2xl"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          w="full"
          h="full"
          bgGradient="linear(to-br, pink.400, blue.500)"
          filter="blur(12px)"
          opacity={0.4}
          zIndex={-1}
        />

        <Container maxW="container.lg">
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={5}
          >
            <Heading
              fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
              fontWeight="bold"
              textAlign="center"
              color="#154c79"
              fontFamily="heading"
              mb={4}
            >
              KanBan AI
            </Heading>

            <Text
              p={5}
              fontSize="sm"
              fontStyle="italic"
              fontWeight="light"
              shadow="xl"
              rounded="xl"
              bg="white"
              color="blue.500"
              maxW="3xl"
              textAlign="center"
            >
              GPT résume vos tâches de la journée...
            </Text>
          </Flex>
        </Container>
      </Box>

      <Box mt={8}>
        <SummarizeButton />
      </Box>

      <DarkModeIconButton position="absolute" top={0} right={2} />

      <DndProvider backend={HTML5Backend}>
        <Container maxW="container.lg" px={4} py={10}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 16, md: 4 }}>
            <Column column={ColumnType.TO_DO} />
            <Column column={ColumnType.IN_PROGRESS} />
            <Column column={ColumnType.BLOCKED} />
            <Column column={ColumnType.COMPLETED} />
          </SimpleGrid>
        </Container>
      </DndProvider>
    </header>
  );
}

export default App;
