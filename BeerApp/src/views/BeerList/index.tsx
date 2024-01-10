import { useEffect, useMemo, useState } from 'react';
import { Beer } from '../../types';
import { fetchData } from './utils';
import { Avatar, Button, List, ListItemAvatar, ListItemButton, ListItemText, Pagination, Stack, TextField, Typography } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';
import styles from '../Home/Home.module.css';

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [beerSearch, setBeerSearch] = useState("");
  const [beerSort, setBeerSort] = useState("asc");

  const [page, setPage] = useState(1);
  const itemsPerPage=4;
  const lastIndex=page*itemsPerPage;
  const firstIndex=lastIndex-itemsPerPage;
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  
  const filteredBeerList = useMemo(() => {
    return beerList.filter(a => a.name.toLowerCase().includes(beerSearch.toLowerCase()));
  }, [beerList, beerSearch]);

   const searchBeerCompany=(e:React.ChangeEvent<HTMLInputElement>)=>{setBeerSearch(e.target.value);}

    
   const sortByName= useMemo(() => {
    if(beerSort==='asc')
    return filteredBeerList.sort((a, b) => a.name.localeCompare(b.name));
  else
  return filteredBeerList.sort((a, b) => b.name.localeCompare(a.name));

  }, [ filteredBeerList,beerSort ]);
   


  const setSortDirection =()=>{
    beerSort==='asc'? setBeerSort('desc'):setBeerSort('asc')
  }
    
 

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);
  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
           <div className={styles.listHeader}>
              <TextField value={beerSearch} label='Filter by name' variant='outlined' onChange={searchBeerCompany} />
              <Button variant='contained' onClick={()=>setSortDirection()}>Sort by name {beerSort==='asc'?'desc':'asc'}</Button>
            </div>
        </header>
        <main>
          
          <List>
            {filteredBeerList.slice(firstIndex,lastIndex).map((beer) => (
              <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={beer.name} secondary={beer.brewery_type} />
              </ListItemButton>
            ))}
          </List>
          
        </main>
        <Stack spacing={2}  >
              <Typography>Page: {page} of {Math.ceil(filteredBeerList.length/itemsPerPage) }</Typography>
              <Pagination count={Math.ceil(filteredBeerList.length/itemsPerPage) } page={page} onChange={handlePageChange} showFirstButton showLastButton  color="primary"/>
            </Stack>
      </section>
      
    </article>
    
  );
};

export default BeerList;
