import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "../styles/Home.module.css";
import { HookFormTypes, TimeProps } from "../types/join";

export default function Join() {
  const { control, setValue, reset, handleSubmit } = useForm<HookFormTypes>();

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

  const onReset = () => {
    reset();
  };

  const onReload = () => {
    setTimerFlg(true);
  };

  const [auth, setAuth] = useState(false);
  const [timerFlg, setTimerFlg] = useState(false);
  const [authNumber, setAuthNumber] = useState();

  const onCheck = handleSubmit((data) => {
    const { auth_num } = data;
    /** 이메일 인증확인 API */
    console.log("auth_num123 ", auth_num);
    if (auth_num === "" || auth_num === undefined) {
      handleClick("인증번호가 만료되었습니다 재인증해주세요", 400);
    } else {
      handleClick("이메일인증이 확인되었습니다", 200);
    }
    /** 로그인 이동창 팝업 */
  });

  const Timer = ({ mm, ss }: TimeProps) => {
    const [minutes, setMinutes] = useState(parseInt(mm));
    const [seconds, setSeconds] = useState(parseInt(ss));

    useEffect(() => {
      const countDown = setInterval(() => {
        if (seconds > 0) setSeconds(seconds - 1);
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(countDown);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);

      if (seconds === 0 && minutes === 0) {
        setTimerFlg(false);
      }
      return () => clearInterval(countDown);
    }, [minutes, seconds]);

    return (
      <div>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    );
  };

  const onSave = handleSubmit((data) => {
    /** 발리데이션 체크 */

    const { email, password, phone, user_name, birth } = data;

    const asd = regExp(email);
    if (asd) {
      const form: HookFormTypes = {
        email: email,
        password: password,
        phone: phone,
        user_name: user_name,
        birth: birth,
      };
      console.log("form ", form);

      handleClick("이메일인증 번호가 전송되었습니다.", 200);
      setAuth(true);
      setTimerFlg(true);
    } else {
      handleClick("이메일 형식이 맞지않습니다", 400);
    }
    onReset;
  });

  /** 이메일 형식체크 */
  const regExp = (email: string) => {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    const emailflg = regex.test(email);

    if (emailflg) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackbar.open}
            onClose={handleClose}
          >
            <Alert severity={snackbar.code === 200 ? "success" : "error"}>
              {snackbar.message}
            </Alert>
          </Snackbar>
          <Box component="form" sx={{ display: "contents", width: "100%" }}>
            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <TextField
                  sx={{ m: 1 }}
                  onChange={onChange}
                  value={value}
                  name={name}
                  label="이메일"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value, name, ref } }) => (
                <TextField
                  sx={{ m: 1 }}
                  onChange={onChange}
                  value={value}
                  name={name}
                  type="password"
                  label="패스워드"
                />
              )}
            />
            <Controller
              control={control}
              name="user_name"
              render={({ field: { onChange, value, name, ref } }) => (
                <TextField
                  sx={{ m: 1 }}
                  onChange={onChange}
                  value={value}
                  name={name}
                  label="유저이름"
                />
              )}
            />
            <Controller
              control={control}
              name="birth"
              render={({ field: { onChange, value, name, ref } }) => (
                <TextField
                  sx={{ m: 1 }}
                  onChange={onChange}
                  value={value}
                  name={name}
                  label="생년월일"
                />
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value, name, ref } }) => (
                <TextField
                  sx={{ m: 1 }}
                  onChange={onChange}
                  value={value}
                  name={name}
                  label="휴대폰번호"
                />
              )}
            />

            {auth ? (
              <>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Controller
                    control={control}
                    name="auth_num"
                    render={({ field: { onChange, value, name, ref } }) => (
                      <TextField
                        ref={ref}
                        sx={{ m: 1, width: "150px" }}
                        onChange={onChange}
                        value={value}
                        name={name}
                        label="이메일 인증번호를 입력하세요"
                      />
                    )}
                  />
                  {timerFlg ? (
                    <Timer mm="0" ss="03" />
                  ) : (
                    <Button
                      sx={{
                        height: "50px",
                        width: "70px",
                        m: "auto",
                        p: "auto",
                      }}
                      variant="contained"
                      onClick={() => {
                        onReload();
                      }}
                    >
                      재인증
                    </Button>
                  )}
                </Box>
                <Typography color="error" display={timerFlg ? "none" : "block"}>
                  인증번호 만료
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    onCheck();
                  }}
                >
                  확인
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  onSave();
                }}
              >
                회원가입
              </Button>
            )}
          </Box>
        </main>
      </div>
    </>
  );
}
