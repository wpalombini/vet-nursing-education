import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Theme } from '@mui/system';
import { ReactNode } from 'react';

export interface ICardContainerProps {
  header?: string;
  content?: ReactNode;
}

const CardContainer: (props: ICardContainerProps) => JSX.Element = (props: ICardContainerProps) => {
  return (
    <Card>
      {props.header && (
        <CardHeader
          component="h3"
          sx={{
            backgroundColor: '#ddd',
            borderBottom: '1px solid #bbb',
            margin: 0,
            paddingX: (theme: Theme) => theme.spacing(3),
            '& .MuiCardHeader-title': { fontWeight: 500, opacity: '0.7' },
          }}
          title={props.header}
        />
      )}
      {props.content && (
        <CardContent
          sx={{
            paddingX: (theme: Theme) => theme.spacing(3),
            '&:last-child': { paddingBottom: (theme: Theme) => theme.spacing(2) },
          }}
        >
          {props.content}
        </CardContent>
      )}
    </Card>
  );
};

export default CardContainer;
