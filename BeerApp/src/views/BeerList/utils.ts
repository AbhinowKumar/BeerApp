import { getBeerList } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void) => {
  (async () => {
    try {
      const response = await getBeerList(); ;
      setData(response.data);
       localStorage.setItem("beerList",JSON.stringify(response.data))
    } catch (error) {
      // @ts-ignore
      setData(JSON.parse(localStorage.getItem("beerList")));
      handle(error);
    }
  })();
};

export { fetchData };
