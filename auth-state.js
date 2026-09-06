// auth-state.js
import { auth, db, doc, getDoc } from '/admin/firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const STORAGE_KEY = 'echo_user';

// ローカルストレージからログイン情報を即時取得（同期的・高速）
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Failed to parse cached user:', e);
    return null;
  }
}

// ローカルストレージへ保存・更新
export function saveCurrentUser(userData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  } catch (e) {
    console.error('Failed to cache user:', e);
  }
}

// ログアウト処理
export async function logout() {
  try {
    await signOut(auth);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('echo_email_for_signin');
    localStorage.removeItem('echo_temp_profile');
    window.location.href = 'index.html';
  } catch (e) {
    console.error('Logout error:', e);
  }
}

// Firebase AuthのセッションとFirestoreを自動監視・同期
export function initAuthWatcher(onUserLoaded) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        // Firestoreから最新プロファイルを取得
        const snap = await getDoc(doc(db, 'users', user.uid));
        let profile = {};
        if (snap.exists()) {
          profile = snap.data();
        }
        
        const fullUser = {
          uid: user.uid,
          email: user.email,
          name: profile.name || user.displayName || 'ゲスト',
          role: profile.role || 'audience',
          affiliation: profile.affiliation || '',
          bands: profile.bands || [],
          instruments: profile.instruments || [],
          ...profile
        };

        saveCurrentUser(fullUser);
        if (onUserLoaded) onUserLoaded(fullUser);
      } catch (err) {
        console.error('Failed to fetch user document:', err);
      }
    } else {
      localStorage.removeItem(STORAGE_KEY);
      if (onUserLoaded) onUserLoaded(null);
    }
  });
}
