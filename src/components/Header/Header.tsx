import { Autocomplete, Group, Burger, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import classes from './Header.module.css';
import Link from 'next/link';

const links = [
    { link: '/', label: 'All Posts' },
  { link: '/posts/new', label: 'New Post' },
];

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
        </Group>
      </div>
    </header>
  );
}