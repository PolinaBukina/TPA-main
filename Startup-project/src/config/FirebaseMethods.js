import app from "./FirebaseConfig";
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  remove,
  push,
} from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage(app);
const auth = getAuth(app);
const db = getDatabase();

const dataRef = ref(db);
onValue(dataRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data); // Вывод данных в консоль
});

//сделано
function createUser({ email, password }) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        set(ref(db, "users/" + user.uid), {
          email: email,
          password: password,
        })
          .then(() => {
            resolve("Аккаунт создан успешно");
          })
          .catch(() => {
            reject("Аккаунт не создан");
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(errorCode, errorMessage);
      });
  });
}

//сделано
function signInUser({ email, password }) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        resolve("Вы успешно вошли");
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        reject(errorMessage);
      });
  });
}

function signOutUser() {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        resolve("Вы вышли из профиля");
      })
      .catch((error) => {
        // An error happened.
        reject(error);
      });
  });
}

function user_is_signin() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        resolve(user);
      } else {
        // User is signed out
        reject("Пользователь вышел из аккаунта");
      }
    });
  });
}

function addItem(obj, rootName, id) {
  return new Promise((resolve, reject) => {
    let reference;
    if (id) {
      reference = ref(db, rootName, id);
    } else {
      obj.key = push(ref(db, rootName)).key;
      reference = ref(db, `${rootName}/${obj.key}`);
    }

    set(reference, obj)
      .then(() => {
        resolve("Успешно добавлено");
      })
      .catch(() => {
        reject("Что0то пошло не так");
      });
  });
}

function addItemWithoutKey(obj, rootName) {
  return new Promise((resolve, reject) => {
    let reference = ref(db, rootName);
    set(reference, obj)
      .then(() => {
        resolve("Успешно добавлено");
      })
      .catch(() => {
        reject("Что0то пошло не так");
      });
  });
}

function getItem(rootName, id) {
  return new Promise((resolve, reject) => {
    let reference;
    if (id) {
      reference = ref(db, `${rootName}/${id}`);
    } else {
      reference = ref(db, rootName);
    }
    onValue(reference, (snapshort) => {
      if (snapshort.exists) {
        resolve(snapshort.val());
      } else {
        reject("Что-то пошло не так");
      }
    });
  });
}

function updateItem(obj, rootName, id) {
  return new Promise((resolve, reject) => {
    let reference = ref(db, `${rootName}/${id}`);
    update(reference, obj)
      .then(() => {
        resolve("Данные добавлены успешно");
      })
      .catch(() => {
        reject("Данные не отправлены");
      });
  });
}

function deleteItem(rootName, id) {
  return new Promise((resolve, reject) => {
    let reference = ref(db, `${rootName}/${id}`);
    remove(reference)
      .then(() => {
        resolve("Успешно удалено");
      })
      .catch(() => {
        reject("Что-то пошло не так");
      });
  });
}

function deleteAllItem(rootName) {
  return new Promise((resolve, reject) => {
    let reference = ref(db, rootName);
    remove(reference)
      .then(() => {
        resolve("Все элементы удалены");
      })
      .catch(() => {
        reject("Что-то пошло не так");
      });
  });
}

function uploadImage(file, rootName, data, rootName1) {
  return new Promise((resolve, reject) => {
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = sRef(storage, `${rootName}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Загрузка " + progress + "% завершена");

        switch (snapshot.state) {
          case "paused":
            console.log("Загрузка на паузе");
            break;
          case "running":
            console.log("Загрузка идет");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          set(ref(db, `${rootName1}/${file.lastModified}`), {
            ...data,
            image: downloadURL,
            key: file.lastModified,
          })
            .then(() => resolve(file.lastModified))
            .catch(() => reject("Не добавлено"));
        });
      }
    );
  });
}

export {
  createUser,
  signInUser,
  signOutUser,
  user_is_signin,
  addItem,
  addItemWithoutKey,
  getItem,
  updateItem,
  deleteItem,
  deleteAllItem,
  uploadImage,
};
