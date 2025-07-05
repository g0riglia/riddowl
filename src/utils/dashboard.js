import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function loadDashboard(uid) {
  const ref = doc(db, "dashboards", uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data().partecipants;
  } else {
    const initial = []; //if it doesnt exist it creates as an empty array
    await setDoc(ref, {
      partecipants: initial,
      lastUpdated: new Date(),
    });
    return initial;
  }
}

export async function saveDashboard(uid, partecipants) {
  const ref = doc(db, "dashboards", uid);
  await updateDoc(ref, {
    partecipants: partecipants,
    lastUpdated: new Date(),
  });
}
