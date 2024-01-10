import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  return (
    <article>
      <section>
        <main>

          <Grid container spacing={2} sx={{ marginTop: 1 }} direction="row" justifyItems="flex-start" alignItems="center" >
                   <Grid item xs={12} sm={6} md={4}       >
               
                  <Card variant="outlined"  >
                    <CardMedia
                      sx={{ minHeight: 300,minWidth:150 }}
                      image="/beer-image.jpg"
                      title="Beer Image"
                    />
                    </Card>
                    </Grid>
                     <Grid item xs={12} sm={6} md={8}       > 
                     <Card variant="outlined" sx={{ minHeight: 300,minWidth:150 }} >
                  <CardContent>
                    <Typography title={beer?.name} sx={{ fontSize:20, margin: 0 }} color="text.secondary" noWrap>
                     <b>{beer?.name}</b> 
                    </Typography>
                    <Typography sx={{ mb: .5 }} color="text.secondary">
                       <b>Type: </b>{beer?.brewery_type}
                    </Typography>
                    <Typography sx={{ mb: .5 }} color="text.secondary">
                       <b>Country: </b>{beer?.country}
                    </Typography>
                    <Typography sx={{ mb: .5 }} color="text.secondary">
                       <b>City: </b>{beer?.city}
                    </Typography>
                  </CardContent>
                  </Card>
                </Grid>
               
              </Grid>
        </main>
      </section>
    </article>
  );
};

export default Beer;
