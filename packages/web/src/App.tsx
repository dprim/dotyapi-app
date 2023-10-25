import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Orders from "./Orders";
/*const ws = new WebSocket("ws://localhost:5000/");
ws.addEventListener("message", (ev) => {
  console.log(ev)
})*/
const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [qs, setQs] = useState(document.location.search);
  const [ordersItems, setOrdersItems] = useState({data: []});
  const thisUrl = new URLSearchParams(qs)
  if(thisUrl.has("token") && thisUrl.has("cloudid")) {
    localStorage.setItem("cloudid", thisUrl.get("cloudid"));
    localStorage.setItem("token", thisUrl.get("token"));
  } else {
    const qst = new URLSearchParams();
    qst.append("token", localStorage.getItem("token"));
    qst.append("cloudid", localStorage.getItem("cloudid"));
    setQs("?"+qst);
  }
  useEffect(() => {
    const getToken = () => {
      fetch("http://localhost:5000/auth/oauth2/callback" + qs, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setAccessToken(resObject.accessToken);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getToken();
  }, [qs]);

  useEffect(() => {
    if(accessToken){
    const getOrders = () => {
      fetch("https://api.dotykacka.cz/v2/clouds/" + localStorage.getItem("cloudid") + "/order-items", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": "Bearer " + accessToken
        },
      })
        .then(async (resObject) => setOrdersItems(await resObject.json()))
    };
    getOrders();
    }
  }, [accessToken])
  return (
    <BrowserRouter>
      {accessToken ? null : (
        <>
          <Box className="login">
            <img
              width="500"
              src="login.png"
              alt=""
              onClick={() => {
                window.open("http://localhost:5000/auth/oauth2", "_self");
              }}
            />
          </Box>
        </>
      )}
      <Orders ordersItems={ordersItems} />
    </BrowserRouter>
  );
};

export default App;
