import { initializeApp } from "firebase/app";
import {getStorage, ref,uploadBytes,getDownloadURL} from "firebase/storage"
import { v4 } from "uuid";
const firebaseConfig = {
  apiKey: "AIzaSyA5gNSkG5cZiKnoHSA-G4gdGiyp5HlTcl4",
  authDomain: "moviesapi-fe493.firebaseapp.com",
  projectId: "moviesapi-fe493",
  storageBucket: "moviesapi-fe493.appspot.com",
  messagingSenderId: "601216349694",
  appId: "1:601216349694:web:071c32dbed8b46fda37caf"
};


const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)


export async function uploadFile(file){    
    //console.log("ARCHIVO: ",file)
    
    const storageRef = ref(storage,v4())
    const metadata = {
      contentType: 'image/jpeg',
    };

    await uploadBytes(storageRef,file.buffer,metadata)
    const imgUrl = await getDownloadURL(storageRef)
    return imgUrl
}