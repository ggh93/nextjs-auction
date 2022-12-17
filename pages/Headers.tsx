import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";

export default function Headers() {
  const router = useRouter();
  const onLogin = () => {
    router.push("/login");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              옥션 사이트
            </Typography>
            {/* 로그인 상태일때 버튼 숨김처리 */}
            <Button color="inherit" onClick={onLogin}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
