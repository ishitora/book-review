import { useAppSelector } from './redux';
import { useRouter } from 'next/router';
const useCheckLogin = () => {
  //如未登入，導向登入頁
  const router = useRouter();
  const isLogin = useAppSelector((state) => state.account?.isLogin);

  return () => {
    if (!isLogin) {
      router.push('/login');
      return false;
    }
    return true;
  };
};

export default useCheckLogin;
