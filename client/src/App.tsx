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
  const produits = useAppSelector((state) => state.produits.produits);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const [option, setOption] = useState('');

  const fetchProduits = async (option?: string) => {
    // let allProducts = await axios.get<Produit[]>(`${BASE_LINK}/allproducts`);
    let allProducts: Produit[] | undefined = undefined;

    if (option === 'asc') {
      allProducts = await axios
        .get<Produit[]>(`${BASE_LINK}/allproducts/sort/asc`)
        .then((res) => res.data);
    } else if (option === 'desc') {
      allProducts = await axios
        .get<Produit[]>(`${BASE_LINK}/allproducts/sort/desc`)
        .then((res) => res.data);
    } else if (option === 'jumia') {
      allProducts = await axios
        .get<Produit[]>(`${BASE_LINK}/allproducts/manufacturer/jumia`)
        .then((res) => res.data);
    } else if (option === 'tunisianet') {
      allProducts = await axios
        .get<Produit[]>(`${BASE_LINK}/allproducts/manufacturer/tunisianet`)
        .then((res) => res.data);
    } else {
      allProducts = await axios
        .get<Produit[]>(`${BASE_LINK}/allproducts`)
        .then((res) => res.data);
    }

    dispatch(setProduits(allProducts!));
  };

  useEffect(() => {
    fetchProduits(option);
  }, [option]);


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
      {!user.user.email && (
        <div className="absolute md:top-3 top-2 md:left-3 left-[2%] md:w-[200px] ">
          <label
            htmlFor="small"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Selectionnez Ordre
          </label>
          <select
            id="small"
            className="w-[100px] md:w-[200px] p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setOption(e.target.value)}
          >
            <option defaultValue="">Tous</option>
            <option value="asc">Ordre Ascendant</option>
            <option value="desc">Ordre Descendant</option>
            <option value="jumia">Par producteur Jumia</option>
            <option value="tunisianet">Par producteur Tunisianet</option>
          </select>
        </div>
      )}
      {user.user.email && (
        <div>
          <div className="absolute top-8 md:left-[23%] w-[200px]">
            <label
              htmlFor="small"
              className="block mb-2 md:text-sm text-xs font-medium text-gray-900 dark:text-white"
            >
              Selectionnez Ordre
            </label>
            <select
              id="small"
              className="w-[100px] p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setOption(e.target.value)}
            >
              <option defaultValue="">Tous</option>
              <option value="asc">Ordre Ascendant</option>
              <option value="desc">Ordre Descendant</option>
              <option value="jumia">Par producteur Jumia</option>
              <option value="tunisianet">Par producteur Tunisianet</option>
            </select>
          </div>
          <p className="absolute md:top-10 top-4 md:left-10 left-4 text-sm md:text-xl">
            Bonjour,
            <span className="md:px-2 px-1 underline italic font-bold text-[#ffa10a]">
              {user.user.email?.split('@')[0]}
            </span>
          </p>
        </div>
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
        <Link
          className="absolute md:-top-2 -top-3  md:right-5 right-0 "
          to="/signup"
        >
          <button className="border border-[#ffa10a] bg-transparent md:p-4 p-2 rounded-md md:text-xl text-xs hover:bg-[#ffa10a] hover:text-white transition duration-200 active:bg-[#ffa10a] active:text-white">
            N'as pas de compte?
          </button>
        </Link>
      )}
    </div>
  );
};

export default App;
