import { defineStore } from 'pinia';
import { auth } from '../firebase';
import { onAuthStateChanged, setPersistence, browserSessionPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
      localStorage.setItem('user',JSON.stringify(user))
    },
    clearUser() {
      this.user = null;
      localStorage.removeItem('user')
    },
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.setUser(user);
        } else {
          this.clearUser();
        }
      });
    },
    async login(email,password){
      try {
        await setPersistence(auth, browserSessionPersistence);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.setUser(userCredential.user);
      } catch (error) {
        console.error('Error signing in:', error);
      }
    },
    async logout() {
      try {
        await signOut(auth);
        this.clearUser();
      } catch (error) {
        console.error('Error signing out:', error);
      }
    },
    async getToken(){
      if(this.user){
        const idToken = await auth.currentUser.getIdToken()
        return idToken
      }
      return null
    }
  },
});