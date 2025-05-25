import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email kiritilishi shart!")
    .required("Email kiritilishi shart!"),
  password: yup
    .string()
    .min(4, "Parolingiz kamida 4 ta belgidan iborat bo'lishi kerak!")
    .required("To'ldirilishi shart!"),
});

export default loginSchema;
