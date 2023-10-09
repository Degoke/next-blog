import Header from "@/components/Header/Header";
import { Center, Container } from "@mantine/core";

export default function Appbase({ children }: { children: React.ReactNode}) {
  return (
    <>
      <Header />
      <main>
        <Center>
          <Container mb={16}>{children}</Container>
        </Center>
      </main>
    </>
  );
}
