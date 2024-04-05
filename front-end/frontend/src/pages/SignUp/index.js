import React, { useState, useEffect } from "react";
import { PageArea } from "./styled";
import useApi from "../../helpers/OlxApi";
import { doLogin } from "../../helpers/AuthHandler";

import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from "../../components/MainComponents";

const Page = () => {
  const api = useApi();

  //DECLARAÇÔES USESTATE

  const [name, setName] = useState("");
  const [stateLoc, setStateLoc] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [stateList, setStateList] = useState([]);

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    };

    getStates();
  }, [api]);


  //FUNÇÔES
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Senhas são diferentes");
      setDisabled(false);
      return;
    }

    const json = await api.register(name, email, password, stateLoc);

    if (json.error) {
      setError(json.error);
    } else {
      doLogin(json.token);
      window.location.href = "/";
    }

    setDisabled(false);
  };

  return (
    <PageContainer>
      <PageTitle>Register</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>

        <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button className="button-face" disabled={disabled}>Login with Facebook</button>
            </div>
          </label>

          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button className="button-google" disabled={disabled}>Sign in with Google</button>
            </div>            
          </label>

          <label className="area">
            <div className="area--title">Full name</div>
            <div className="area--input">
              <input
                type="text"
                disabled={disabled}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">State</div>
            <div className="area--input">
              <select
                value={stateLoc}
                onChange={(e) => setStateLoc(e.target.value)}
                required
              >
                <option></option>
                {stateList.map((i, k) => (
                  <option key={k} value={i._id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="area">
            <div className="area--title">E-mail</div>
            <div className="area--input">
              <input
                type="email"
                disabled={disabled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Password</div>
            <div className="area--input">
              <input
                type="password"
                disabled={disabled}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Confirm password</div>
            <div className="area--input">
              <input
                type="password"
                disabled={disabled}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Sign up</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
