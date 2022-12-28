import { useParams } from 'react-router-dom';
import { truncateString } from '../App';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setProduit } from '../features/ProduitsSlice';

const ProduitInfo = () => {
  const { id } = useParams<{ id: string }>();
  const produits = useAppSelector((state) => state.produits.produits);
  const dispatch = useAppDispatch();

  const produitDePage = produits.find((produit) => produit._id === id);

  if (produitDePage) {
    dispatch(setProduit(produitDePage));
  }

  const produitsMoinsChers = produits
    .filter((produit) => produit.price <= produitDePage!.price)
    .filter((produit) => {
      if (produitDePage!.title.includes(produit.title.slice(0, 11))) {
        return produit._id !== produitDePage!._id;
      }
    })
    .splice(0, 6);

  return (
    <div className="flex items-center justify-center md:h-screen">
      <div className="bg-white text-black rounded-md">
        <div className="flex justify-center items-center md:p-8 p-4 space-x-4 md:w-[600px] w-[300px] h-fit">
          <div>
            <img
              src={produitDePage?.imgSrc}
              alt={`Image de produit ${produitDePage?.title}`}
            />
          </div>
          <div className="flex flex-col space-y-4">
            <h1 className="text-xl break-all">
              {truncateString(produitDePage!.title)}
            </h1>
            <p>{produitDePage?.price.toFixed(3)} TND</p>
            <a
              href={produitDePage?.productLink}
              target="_blank"
              className="transition duration-400 text-center text-sm p-2 border border-[#4b2354] rounded-full text-[#4b2354] bg-white hover:bg-[#4b2354] hover:text-white md:w-[40%] w-full active:bg-[#4b2354] active:text-white"
            >
              Achetez
            </a>
          </div>
        </div>

        {produitsMoinsChers.length > 0 && (
          <p className="text-center md:text-xl text-sm text-[#4b2354]">
            Autres produits ayant le meme prix ou un prix inferieure
          </p>
        )}

        <div className="flex md:flex-row flex-col justify-center items-center h-auto w-full">
          {produitsMoinsChers.map((produit) => (
            <div
              key={produit._id}
              className="h-fit  md:w-[200px] w-[100px] p-4 space-y-2  space-x-8 md:space-x-0 flex md:flex-col justify-center items-center"
            >
              <img
                className="w-[100px] h-[100px]"
                src={produit.imgSrc}
                alt="image de produit moins cher"
              />
              <p className="break-word">{truncateString(produit.title, 20)}</p>
              <p>{produit.price.toFixed(3)} TND</p>
              <a
                href={produit.productLink}
                target="_blank"
                className="font-bold transition duration-400 text-center text-sm p-2 border border-[#4b2354] rounded-full text-[#4b2354] bg-white hover:bg-[#4b2354] hover:text-white active:bg-[#4b2354] active:text-white"
              >
                Achetez ceci
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProduitInfo;
