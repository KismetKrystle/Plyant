export const isAuthenticated = () => {
  let user;

  // TODO: Replace localStorage with database call to get user
  if (typeof window !== 'undefined') {
    user = localStorage.getItem('user');
  }

  if (!user) {
    return {};
  }

  return JSON.parse(user);
};
