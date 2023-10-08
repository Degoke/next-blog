import Header from "@/components/Header/Header";
import { Center } from "@mantine/core";

 
export default function Appbase({ children }) {
  return (
    <>
      <Header />
      <main>
        <Center>
        {children}
            </Center></main>
    </>
  )
}