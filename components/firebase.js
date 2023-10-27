import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXnASqEdnBBLphp5rvuEXara5EbzTJh6o",
  authDomain: "portfolio-9238e.firebaseapp.com",
  projectId: "portfolio-9238e",
  storageBucket: "portfolio-9238e.appspot.com",
  messagingSenderId: "950795085503",
  appId: "1:950795085503:web:e882246e00ffd42b3e880a",
  measurementId: "G-51LHC1DJD8",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const pathRef = ref(storage, "");

export async function getPost(id) {
  return await downloadFile(ref(storage, "/" + id + ".md"));
}

export async function getAllPosts() {
  var fileDatas = await listAll(pathRef).then(async (res) => {
    return await Promise.all(
      res.items.map(async (item) => {
        const r = await downloadFile(item);
        return r;
      })
    );
  });
  return fileDatas;
}

async function downloadFile(referenceObj) {
  var postRaw = await getDownloadURL(referenceObj).then(async (url) => {
    return await fetch(url, {
      method: "GET",
    }).catch((error) => {
      console.log(error);
    });
  });
  const content = await postRaw.text();
  const id = referenceObj.name.replace(/\.md$/, '');
  return {id: id, raw: content};
}
