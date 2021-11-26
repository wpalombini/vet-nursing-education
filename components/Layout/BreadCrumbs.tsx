import { Grid, Box, Link as LinkUI } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export const BreadCrumbs = () => {
  const router = useRouter();
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    // split route by '/'
    // filter duplicates like ['', '']
    const splitted = router.route
      .split('/')
      .filter((path: string, index: number, self: string[]) => self.indexOf(path) === index);

    const urls = splitted
      // slice below removes the current path. If you want to display it, map the path name to a proper name
      .slice(0, splitted.length - 1)
      .map((path: string, index: number) => {
        if (path === '') return '/';

        return splitted.slice(0, index + 1).join('/');
      });

    setPaths(urls);
  }, [router.route]);

  const pathNames = {
    '/': 'Home',
    '/articles': 'Articles',
  } as any;

  return (
    <Grid container justifyContent="center" sx={{ marginBottom: 2 }}>
      <Grid item xs={12} md={8}>
        <Box>
          {paths &&
            paths.map((path: string, index: number) => (
              <>
                <Link href={`${path}`}>
                  <LinkUI href={`${path}`}>{pathNames[path]}</LinkUI>
                </Link>
                {index !== paths.length - 1 ? <span style={{ padding: '0 5px', opacity: '0.7' }}>&gt;</span> : null}
              </>
            ))}
        </Box>
      </Grid>
    </Grid>
  );
};
