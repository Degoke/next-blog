import { Group, Burger, Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
import Link from "next/link";

const links = [
  { link: "/", label: "All Posts" },
  { link: "/posts/new", label: "New Post" },
];

export default function Header() {

  const items = links.map((link) => (
    <Link key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Center>
        <Group ml={50} gap={5} className={classes.links}>
          {items}
        </Group>
        </Center>
      </div>
    </header>
  );
}
