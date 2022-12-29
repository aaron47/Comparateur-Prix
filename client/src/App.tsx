import { useEffect, useState } from 'react';
import { Produit } from './utils/Produit';
import axios from 'axios';
import ProduitItem from './components/ProduitItem';
import { BASE_LINK } from './utils/Baselink';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setProduits } from './features/ProduitsSlice';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from './services/usersApi';
import { logoutUser } from './features/UsersSlice';

export const truncateString = (str: string, num?: number): string => {
  if (num) return str.slice(0, num) + '...';
  if (str.length > 50) return str.slice(0, 50) + '...';
  return str;
};

const App = () => {
  // const [produits, setProduits] = useState<Produit[]>([]);
  const produits = useAppSelector((state) => state.produits.produits);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const fetchProduits = async () => {
    const allProducts = await axios.get<Produit[]>(`${BASE_LINK}/allproducts`);

    dispatch(setProduits(allProducts.data));
  };

  useEffect(() => {
    fetchProduits();
  }, []);

  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await logout(undefined)
      .then(() => {
        localStorage.clear();
        dispatch(logoutUser());
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col space-y-6 relative">
      {user.user.email && (
        <p className="absolute md:top-10 top-4 md:left-10 left-4 text-sm md:text-xl">
          Bonjour,
          <span className="md:px-2 px-1 underline italic font-bold text-[#ffa10a]">
            {user.user.email?.split('@')[0]}
          </span>
        </p>
      )}

      <div>
        <h3 className="text-center md:text-4xl text-xl p-4">Nos Produits</h3>
        <div className="md:w-[200px] w-[80px] bg-[#ffa10a] h-[5px] mx-auto -mt-2 rounded-md" />
      </div>
      <div className="grid md:grid-cols-5 grid-cols-2 gap-x-4 gap-y-4">
        {produits.map((produit) => (
          <ProduitItem key={produit._id} produit={produit} />
        ))}
      </div>

      {user.user.email && (
        <button
          onClick={handleLogout}
          className="absolute top-2 right-10 border border-[#ffa10a] bg-transparent p-4 rounded-md text-xl hover:bg-[#ffa10a] hover:text-white transition duration-200"
        >
          Logout
        </button>
      )}

      {!user.user.email && (
        <button className="absolute md:-top-2 -top-3  md:right-10 right-0 border border-[#ffa10a] bg-transparent md:p-4 p-2 rounded-md md:text-xl text-xs hover:bg-[#ffa10a] hover:text-white transition duration-200 active:bg-[#ffa10a] active:text-white">
          <Link to="/signup">N'as pas de compte?</Link>
        </button>
      )}
    </div>
  );
};

export default App;
