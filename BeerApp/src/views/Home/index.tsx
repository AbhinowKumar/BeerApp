import { useEffect, useMemo, useState } from 'react';
import { fetchData } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Paper, TextField, Link, Card, CardContent, Typography, CardActions, IconButton, CardMedia, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from './Home.module.css';
import { Delete } from '@mui/icons-material';

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>([]);
  const [favouriteList, setFavouriteList] = useState<Array<Beer>>([]);
  const [beerSearch, setBeerSearch] = useState("");
  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);
  
  const filteredBeerList = useMemo(() => {
    return beerList.filter(a => a.name.toLowerCase().includes(beerSearch.toLowerCase()));
  }, [beerList, beerSearch]);

  const reloadData=()=>{
    setBeerSearch("");
  }

  useEffect(() => {
    const savedItems = localStorage.getItem("savedItems");
    if (savedItems) {
      setSavedList(JSON.parse(savedItems));
    }
  }, [favouriteList]);

  const searchBeerCompany=(e:React.ChangeEvent<HTMLInputElement>)=>{setBeerSearch(e.target.value);}

const saveFavourite = (beer:Beer) => {setFavouriteList([...savedList, beer]); setSavedList([...savedList, beer]); localStorage.setItem("savedItems", JSON.stringify([...savedList, beer]))};
const removeFavourite = (beer:Beer) => {setFavouriteList(savedList.filter((a) => a.id !== beer.id));    setSavedList(savedList.filter((a) => a.id !== beer.id)); localStorage.setItem("savedItems", JSON.stringify(savedList.filter((a) => a.id !== beer.id)))}; 
const clearFavourite= () => {localStorage.removeItem("savedItems");setSavedList([])};

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField value={beerSearch} label='Filter by name' variant='outlined' onChange={searchBeerCompany} />
                <Button variant='contained' onClick={reloadData}>Reload list</Button>
              </div>
 
              <Grid container spacing={2} sx={{ marginTop: 1 }}direction="row" justifyItems="flex-start" alignItems="stretch" >
                {filteredBeerList.map((beer, index) => (
                   <Grid item xs={12} sm={6} md={3}   key={index.toString()}   >
               
                  <Card variant="outlined"  >
                    <CardMedia
                      sx={{ minHeight: 200,minWidth:150 }}
                      image="/beer-image.jpg"
                      title="green iguana"
                    />
                  <CardContent>
                    <Typography title={beer.name} sx={{ fontSize: 14 }} color="text.secondary" noWrap>
                      {beer.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {beer.brewery_type}
                    </Typography>
                  </CardContent>
                  <CardActions>
                   {savedList.filter((a) => a.id === beer.id).length>0?<IconButton aria-label="remove from favorites" onClick={()=>removeFavourite(beer)}>
                      <FavoriteIcon   />
                    </IconButton>:<IconButton aria-label="add to favorites" onClick={()=>saveFavourite(beer)}>
                      <FavoriteBorderIcon   />
                    </IconButton> } 
                    
                    <Link component={RouterLink} to={`/beer/${beer.id}`}  >
                      Details
                    </Link>
                  </CardActions>
                  </Card>
                </Grid>
                ))}
              </Grid>
          
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Favourite items</h3>
                <Button variant='contained' size='small' onClick={clearFavourite}>
                  Remove all favourite items
                </Button>
              </div>
              <Grid container spacing={2} sx={{ marginTop: 1 }}direction="row" justifyItems="flex-start" alignItems="stretch" >
                {savedList.map((beer, index) => (
                   <Grid item xs={12} sm={6} md={3}   key={index.toString()}   >
               
                  <Card variant="outlined"  >
                    <CardMedia
                      sx={{ minHeight: 270,minWidth:150 }}
                      image="/beer-image.jpg"
                      title="green iguana"
                    />
                  <CardContent>
                    <Typography title={beer.name} sx={{ fontSize: 14 }} color="text.secondary" noWrap>
                      {beer.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {beer.brewery_type}
                    </Typography>
                  </CardContent>
                  <CardActions>
                   <IconButton title="remove from favorites" aria-label="remove from favorites" onClick={()=>removeFavourite(beer)}>
                      <Delete />
                    </IconButton>
                    <Link component={RouterLink} to={`/beer/${beer.id}`}  >
                      Details
                    </Link>
                  </CardActions>
                  </Card>
                </Grid>
                ))}
              </Grid>
              {!savedList.length && <p>No favourite items</p>}
              
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
