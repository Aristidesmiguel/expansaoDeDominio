import { ICollectionProps } from "@/@types/iterfaceSystem";
import { db } from "@/firebase/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const collection_name = "anime";

async function salveAnime(item: ICollectionProps): Promise<string> {
  const docRef = await addDoc(collection(db, collection_name), item);
  return docRef.id;
}

async function getAnime(userId: string | undefined): Promise<ICollectionProps[]> {
  const q = query(collection(db, collection_name), where("uid", "==", userId));
  const animes = [] as ICollectionProps[];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const anime = { ...doc.data() as ICollectionProps, id: doc.id };
    animes.push(anime);
  })
  return animes
}

export default { salveAnime, getAnime };