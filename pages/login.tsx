import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import router from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import logindata from "../lib/loginDatabase.json";

interface LoginForm {
  name: string;
  password: string;
}

export default function login() {
  const { control, handleSubmit } = useForm<LoginForm>();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const Login = handleSubmit((data) => {
    const { name, password } = data;
    const form: LoginForm = {
      name,
      password,
    };
    // 쿠키&&세션 추가
    if (form.name === undefined) {
      handleClick("아이디는 필수입력입니다.", 400);
    } else if (form.password === undefined) {
      handleClick("패스워드는 필수입력입니다.", 400);
    } else if (
      form.name !== logindata.name ||
      form.password !== logindata.password
    ) {
      handleClick("아이디 및 패스워드가 일치하지않습니다.", 400);
    } else {
      router.push("/main");
    }
  });

  /**
   *  임시 로그인 데이터베이스
   */
  /** 스냅샷 */
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    code: number;
  }>({
    open: false,
    message: "",
    code: 0,
  });

  const handleClick = (message: string, code: number) => {
    setSnackbar({ open: true, message: message, code: code });
  };

  const handleClose = () => {
    setSnackbar({ open: false, message: "", code: 0 });
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbar.open}
        onClose={handleClose}
      >
        <Alert severity={snackbar.code === 200 ? "success" : "error"}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Box
        component="form"
        sx={{
          width: "100%",
          height: "400px",
          display: "grid",
          pt: "250px",
          justifyContent: "center",
          textAlign: "center",
          verticalAlign: "middle",
        }}
      >
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value = "", name, ref } }) => (
            <TextField
              name={name}
              onChange={onChange}
              value={value}
              label="아이디 입력"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value = "", name, ref } }) => (
            <TextField
              name={name}
              onChange={onChange}
              value={value}
              type="password"
              label="비밀번호 입력"
            />
          )}
        />
        <Button onClick={Login} variant="contained">
          로그인
        </Button>
        {/* <Typography sx={{ color: "red" }}>아이디가 맞지않습니다</Typography> */}
      </Box>
    </>
  );
}
