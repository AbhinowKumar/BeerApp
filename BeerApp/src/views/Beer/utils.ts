import { getBeer } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Beer) => void, id?: string) => {
  if (!id) return;

  (async () => {
    try {
      const response = await getBeer(id);
      setData(response.data);
    } catch (error) {
      // @ts-ignore
      let beerListData=JSON.parse(localStorage.getItem("beerList"));
      let selectedBeer= beerListData.filter((a:Beer)=>a.id===id);
      console.log(selectedBeer[0])
      setData(selectedBeer[0]);
      handle(error);
    }
  })();
};


export { fetchData };
