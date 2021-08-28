import { FC, Fragment, ReactChild } from 'react';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import NavBarComponent from './NavBarComponent';

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
    <Fragment>
      <NavBarComponent />
      <Container maxWidth="lg" className={classes.root}>
        {props.children}
      </Container>
    </Fragment>
  );
};

export default LayoutComponent;
