import { FC, Fragment, ReactChild, useContext } from 'react';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import NavBarComponent from './NavBarComponent';
import { LinearProgress } from '@material-ui/core';
import { UXContext } from '../../providers/UXProvider';

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

  const { isLoading } = useContext(UXContext);

  return (
    <Fragment>
      <NavBarComponent />
      {isLoading && <LinearProgress color="secondary" />}
      <Container maxWidth="lg" className={classes.root}>
        {props.children}
      </Container>
    </Fragment>
  );
};

export default LayoutComponent;
