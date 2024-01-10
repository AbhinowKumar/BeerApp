import { getRandomBeerList } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void) => {
  (async () => {
    try {
      const { data } = await getRandomBeerList(10);
      setData(data);
      localStorage.setItem("beerListHome",JSON.stringify(data))
     
    } catch (error) {
      // @ts-ignore
      setData(JSON.parse(localStorage.getItem("beerListHome")));
      handle(error);
    }
  })();
};

export { fetchData };
