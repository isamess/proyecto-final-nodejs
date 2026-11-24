
//Los modelos se encargan de interactuar directamente con los datos. Su objetivo es abstraer la lógica de acceso a los datos, proporcionando métodos. Los modelos no deben contener lógica de negocio; su función es simplemente gestionar los datos.


import { db } from "../data/data.js";
import{collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where} from "firebase/firestore";



export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error obteniendo colección de productos:`, error);
    throw error;
  }
};


export const getProductById = async(idDocumento) => {
    try{
        const docRef = doc(db,  "products", idDocumento);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    } 

    } catch(error){
        console.error(`Error obteniendo el documento con ID ${idDocumento}:`, error);
    throw error;
}
};

export const getProductsByCategory = async (valor) => {
  try {
    const q = query(collection(db, "products"), where("categoria", "==", valor));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error buscando por categorías:`, error);
    throw error;
  }
};

export const createProduct = async (nuevoProducto) => {
  try {
    const docRef = await addDoc(collection(db, "products"), nuevoProducto);
    return { id: docRef.id, ...nuevoProducto };
  } catch (error) {
    console.error(`Error creando el producto en products:`, error);
    throw error;
  }
};

export const deleteProduct = async (idDocumento) => {
  try {
    const docRef = doc(db, "products", idDocumento);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return null;
    }
    await deleteDoc(docRef);
    return idDocumento;
  } catch (error) {
    console.error(`Error eliminando el documento con ID ${idDocumento}:`, error);
    throw error;
  }
};

export const updateProduct = async (id, updatedData) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return null;
    }
    await updateDoc(docRef, updatedData);
    return { id, ...docSnap.data(), ...updatedData };
  } catch (error) {
    console.error(`Error actualizando el documento con ID ${id}:`, error);
    throw error;
  }
};
