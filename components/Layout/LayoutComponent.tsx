import { FC, Fragment, ReactChild, useContext } from 'react';
import Container from '@mui/material/Container';
import NavBarComponent from './NavBarComponent';
import { LinearProgress } from '@mui/material';
import { UXContext } from '../../providers/UXProvider';

interface ILayoutProps {
  children: ReactChild;
}

const LayoutComponent: FC<ILayoutProps> = (props: ILayoutProps) => {
  const { isLoading } = useContext(UXContext);

  return (
    <Fragment>
      <NavBarComponent />
      {isLoading && <LinearProgress color="secondary" />}
      <Container maxWidth="lg" sx={{ paddingTop: '20px' }}>
        {props.children}
      </Container>
    </Fragment>
  );
};

export default LayoutComponent;
