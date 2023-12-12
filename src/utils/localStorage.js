export const addUserToLocalStorage = (user) => {
    console.log(user, 'received in add');
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', user);
    }
  };
  
  export const removeUserFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };
  
  export const getUserFromLocalStorage = () => {
    let result;
    if (typeof window !== 'undefined') {
      result = localStorage.getItem('user');
    }
  
    return result;
  };
  
  
  export const addToLocalStorage = (user, key) => {
    console.log(user, 'received in add');
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, user);
    }
  };
  
  export const removeFromLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  };
  
  export const getFromLocalStorage = (key) => {
    let result;
    if (typeof window !== 'undefined') {
      result = localStorage.getItem(key);
    }
  
    return result;
  };
  