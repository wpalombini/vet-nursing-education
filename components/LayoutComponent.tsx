import { FC, ReactChild } from 'react';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles } from '@material-ui/core/styles';

interface ILayoutProps {
  children: ReactChild;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingTop: 20,
    },
  }),
);

const LayoutComponent: FC<ILayoutProps> = (props: ILayoutProps) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      {props.children}
    </Container>
  );
};

export default LayoutComponent;
