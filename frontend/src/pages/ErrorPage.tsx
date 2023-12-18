import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

export default function ErrorPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate('/');
    }
  }, [countdown, navigate]);

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <WarningAmberRoundedIcon style={{ fontSize: 100 }}/>
      <p>此操作需要登入帳號，請先進行登入。</p>
      <p>頁面將在 {countdown} 秒後導回首頁。</p>
    </div>
  );
}
