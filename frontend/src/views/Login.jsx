import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Login = () => {
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    setErrors(null);
    axiosClient.post("/login", payload)
      .then(({ data }) => {
        setToken(data.token);
        setUser(data.user);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          }else{
            setErrors({
              email: [response.data.message]
            });
          }
        }
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        {errors && <div className="alert">
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>}
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>
          <input type="email" ref={emailRef} placeholder="Email" />
          <input type="password" ref={passwordRef} placeholder="Password" />
          <button type="submit" className="btn btn-block">Login</button>
          <p className="message">
            Not Register? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
