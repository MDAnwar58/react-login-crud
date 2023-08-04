import { useRef, useState } from "react";
import { Link } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    axiosClient.post('/signup', payload)
      .then(({ data }) => {
        // console.log(data);
        setToken(data.token);
        setUser(data.user);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
          setErrors(response.data.errors);
        }
      });
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
          <h1 className="title">Signup for free</h1>
          <input type="text" ref={nameRef} placeholder="Full Name" />
          <input type="email" ref={emailRef} placeholder="Email Address" />
          <input type="password" ref={passwordRef} placeholder="Password" />
          <input type="password" ref={passwordConfirmationRef} placeholder="Password Confirmation" />
          <button type="submit" className="btn btn-block">Signup</button>
          <p className="message">
            Already Signup? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
