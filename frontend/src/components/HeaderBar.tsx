import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import IconButton from "@mui/material/IconButton";
import { useNavigate } from 'react-router-dom';


export default function HeaderBar() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
        <IconButton
          onClick={goBack}
          size="large"
          sx={{ ml: 1 }}
        >
          <ArrowBackIosSharpIcon sx={{ color:"white" }} fontSize="large"/>
        </IconButton>
    </>
  );
}
