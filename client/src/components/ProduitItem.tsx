import { Link } from 'react-router-dom';
import { truncateString } from '../App';
import { Produit } from '../utils/Produit';

interface Props {
  produit: Produit;
}

const ProduitItem: React.FC<Props> = ({ produit }) => {
  return (
    <div>
      <div
        className={`bg-white text-black mx-2 rounded-[10px] p-4 h-[300px] shadow-black/20 hover:scale-105 transition duration-200 flex flex-col text-center items-center justify-center ${
          truncateString(produit.title).length < 30 ? 'md:space-y-1.5 space-y-4' : ''
        }`}
      >
        <img className="md:h-[180px] md:w-[200px] h-[100px] w-[100px]" src={produit.imgSrc} />
        <h1 className="text-sm">{truncateString(produit.title)}</h1>
        <p className="">{produit.price.toFixed(3)} TND</p>
        <Link
          to={`produits/${produit._id}`}
          className="transition duration-400 text-center text-sm p-2 border border-[#4b2354] rounded-full text-[#4b2354] bg-white hover:bg-[#4b2354] hover:text-white active:bg-[#4b2354] active:text-white"
        >
          Achetez Maintenant
        </Link>
      </div>
    </div>
  );
};

export default ProduitItem;
