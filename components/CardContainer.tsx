import { Card, CardContent, Grid } from '@mui/material';
import { Theme } from '@mui/system';
import { ReactNode } from 'react';

export interface ICardContainerProps {
  header?: ReactNode;
  content?: ReactNode;
}

export const CardTitle = ({ title }: any) => {
  return (
    <h2
      style={{
        fontWeight: 'bold',
        opacity: '0.7',
        margin: '0',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {title}
    </h2>
  );
};

export const CardContainer: (props: ICardContainerProps) => JSX.Element = (props: ICardContainerProps) => {
  return (
    <Card>
      {props.header && (
        <Grid
          container
          sx={{
            backgroundColor: '#ddd',
            borderBottom: '1px solid #bbb',
            margin: 0,
            padding: (theme: Theme) => theme.spacing(3),
          }}
        >
          <Grid item xs={12}>
            {props.header}
          </Grid>
        </Grid>
      )}
      {props.content && (
        <CardContent
          sx={{
            padding: (theme: Theme) => theme.spacing(3),
            '&:last-child': { paddingBottom: (theme: Theme) => theme.spacing(2) },
          }}
        >
          {props.content}
        </CardContent>
      )}
    </Card>
  );
};
