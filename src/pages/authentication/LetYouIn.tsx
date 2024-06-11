import React from "react";
import styled from "styled-components";
import { BackArrowBlackIcon, LogoIcon } from "../../constants/icons";
// import { Colors } from "../constants/Colors";
import Typography from "../../constants/Typography";

function LetYouIn() {
  return (
    <Container>
        <div className="topNav">
            <div>
            <LogoIcon />
            </div>
            <div>
            <div>
                <BackArrowBlackIcon />
            </div>
            </div>
        </div>

        <div className="content">
          <div className="left">
            <img src="/images/letInImage.png" alt="Let in photos" />
          </div>
          <div className="right">
            <p style={Typography.heading._1}>Let's you in</p>
            <div>
              <div>
                <p>Continue with Facebook</p>
              </div>
              <div>
                <p>Continue with Google</p>
              </div>
              <div>
                <p>Continue with Apple</p>
              </div>
              <div>
                <p>or</p>
              </div>

              <button>Sign in with password</button>
            </div>
            <p>
              Don't have an account? <span>Sign Up</span>
            </p>
          </div>
        </div>
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap:5rem;

    .topNav{
        margin-left: 10%;
        display: flex;
        flex-direction: column;
        gap: 5rem;
    }

    .content{
        margin-left: 10%;
        margin-right: 10%;
        display: flex;
        align-items:center;
        justify-content: space-around;
    }

    .left {
        color: "blue";
        background-color:"red";
    }

    .right {
        color: "blue";
    }
`;

export default LetYouIn;
