import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    DocumentData,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export default class FirestoreManager<T extends DocumentData> {
    private collectionName: string;

    constructor(collectionName: string) {
        this.collectionName = collectionName;
    }
    async create(data: T | Record<string, any>): Promise<string> {
        try {
            const docRef = await addDoc(collection(db, this.collectionName), data);
            console.log(`${this.collectionName}: Belge başarıyla eklendi, ID: ${docRef.id}`);
            return docRef.id;
        } catch (error) {
            console.error(`${this.collectionName}: Belge eklenirken hata oluştu:`, error);
            throw error;
        }
    }
    async getById(id: string): Promise<T | null> {
        try {
            const docRef = doc(db, this.collectionName, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data() as T;
            } else {
                console.warn(`${this.collectionName}: Belge bulunamadı.`);
                return null;
            }
        } catch (error) {
            console.error(`${this.collectionName}: Belge getirilirken hata oluştu:`, error);
            throw error;
        }
    }

    async getAll(): Promise<T[]> {
        try {
            const querySnapshot = await getDocs(collection(db, this.collectionName));
            const documents: T[] = [];
            querySnapshot.forEach((doc) => {
                documents.push({ id: doc.id, ...doc.data() } as unknown as T);
            });
            return documents;
        } catch (error) {
            console.error(`${this.collectionName}: Belgeler getirilirken hata oluştu:`, error);
            throw error;
        }
    }

    async update(id: string, data: Partial<T>): Promise<void> {
        try {
            const docRef = doc(db, this.collectionName, id);
            await updateDoc(docRef, data as DocumentData);
            console.log(`${this.collectionName}: Belge başarıyla güncellendi.`);
        } catch (error) {
            console.error(`${this.collectionName}: Belge güncellenirken hata oluştu:`, error);
            throw error;
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const docRef = doc(db, this.collectionName, id);
            const docSnap = await getDoc(docRef);
    
            if (!docSnap.exists()) {
                console.warn(`${this.collectionName}: Belge zaten mevcut değil veya silinmiş.`);
                return;
            }
    
            await deleteDoc(docRef);
            console.log(`${this.collectionName} id: ${id}: Belge başarıyla silindi.`);
    
            const verifySnap = await getDoc(docRef);
            if (verifySnap.exists()) {
                console.warn(`${this.collectionName}: Silme işlemi başarısız oldu.`);
            } else {
                console.log(`${this.collectionName}: Belge silme işlemi doğrulandı.`);
            }
        } catch (error) {
            console.error(`${this.collectionName}: Belge silinirken hata oluştu:`, error);
            throw error;
        }
    }
    
    async deleteByCustomId(customId: string): Promise<void> {
        try {
            const q = query(collection(db, this.collectionName), where("id", "==", customId));
            const querySnapshot = await getDocs(q);
    
            if (querySnapshot.empty) {
                console.warn(`${this.collectionName}: Belirtilen id (${customId}) ile eşleşen belge bulunamadı.`);
                return;
            }
                const docRef = querySnapshot.docs[0].ref;
            await deleteDoc(docRef);
    
            console.log(`${this.collectionName}: Custom ID (${customId}) ile belge başarıyla silindi.`);
        } catch (error) {
            console.error(`${this.collectionName}: Belge silinirken hata oluştu:`, error);
            throw error;
        }
    }

    async queryByField(field: string, value: unknown): Promise<T[]> {
        try {
            const q = query(collection(db, this.collectionName), where(field, "==", value));
            const querySnapshot = await getDocs(q);
            const results: T[] = [];
            querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() } as unknown as T);
            });
            return results;
        } catch (error) {
            console.error(`${this.collectionName}: Sorgu sırasında hata oluştu:`, error);
            throw error;
        }
    }
}
