/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../constants/API";

function VerificationEmail() {
  const [message, setMessage] = useState("Loading...");

  const { token } = useParams();

  useEffect(() => {
    axios
      .patch(
        `${API_URL}/user/verified`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setMessage("Your Account has Verified!");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div className="p-10">{message}</div>;
}

export default VerificationEmail;
