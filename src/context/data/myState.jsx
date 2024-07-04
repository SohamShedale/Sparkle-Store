import { useEffect, useState } from "react"
import MyContext from "./myContext"
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";

const myState = ({children}) => {
  const [mode, setMode] = useState('light')
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductData();
  }, []);

  const toggleMode = () => {
    let changedTheme = mode == 'light' ? 'dark' : 'light'
    setMode(changedTheme) 
    document.body.style.backgroundColor = changedTheme == 'light' ? '#ffffff' : "rgb(17,24,39)";
  }

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // Add Product Section
  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("Please fill all fields");
    }
    const productRef = collection(fireDB, "products");
    setLoading(true);
    try {
      await addDoc(productRef, products);
      toast.success("Product Add successfully");
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 800);
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setProducts("");
  };

  const [product, setProduct] = useState([]);

  // get product
  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time")
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      setLoading(false);
    }
  };

  const edithandle = (item) => {
    setProducts(item);
  };
  // update product
  const updateProduct = async (item) => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully");
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 800);
      getProductData();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setProducts("");
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product Deleted successfully");
      setLoading(false);
      getProductData();
    } catch (error) {
      toast.error('Product Deleted Falied')
      setLoading(false);
    }
  };

  return (
    <MyContext.Provider value={{mode, toggleMode, loading, setLoading, products, setProducts, addProduct, product, edithandle, updateProduct, deleteProduct}}>
      {children}
    </MyContext.Provider>
  )
}

export default myState
