
import { UserRole, Provider } from '../../types';

class AuthStore {
  isAuthenticated: boolean = false;
  userRole: UserRole = null;
  currentUser: any = null;
  listeners: Function[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sevadhar_auth', JSON.stringify({
        isAuthenticated: this.isAuthenticated,
        userRole: this.userRole,
        currentUser: this.currentUser
      }));
    }
  }

  private loadFromStorage() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sevadhar_auth');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          this.isAuthenticated = data.isAuthenticated;
          this.userRole = data.userRole;
          this.currentUser = data.currentUser;
        } catch (e) {
          console.error("Failed to parse auth storage", e);
        }
      }
    }
  }

  login(role: UserRole, user: any) {
    this.isAuthenticated = true;
    this.userRole = role;
    this.currentUser = {
      ...user,
      isProvider: role === 'provider' || user.isProvider === true
    };
    this.saveToStorage();
    this.notify();
  }

  logout() {
    this.isAuthenticated = false;
    this.userRole = null;
    this.currentUser = null;
    this.saveToStorage();
    this.notify();
  }

  switchRole(role: UserRole) {
    if (this.isAuthenticated) {
      this.userRole = role;
      this.saveToStorage();
      this.notify();
    }
  }

  upgradeToProvider() {
      if (this.isAuthenticated && this.currentUser) {
          this.currentUser = {
              ...this.currentUser,
              isProvider: true,
              isOnboarded: false // Force onboarding for new providers
          };
          this.userRole = 'provider'; 
          this.saveToStorage();
          this.notify();
      }
  }

  updateUser(data: any) {
    this.currentUser = { ...this.currentUser, ...data };
    this.saveToStorage();
    this.notify();
  }

  subscribe(listener: Function) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l());
  }
}

export const authStore = new AuthStore();
