import create from "zustand";

const LoginStore = create((set) => ({
  login: false,
  setLogin: () => set(() => ({ login: true })),
}));

export default LoginStore;