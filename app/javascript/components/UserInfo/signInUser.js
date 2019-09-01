import React, { useRef } from "react";
import { Mutation } from "react-apollo";
import { Me, SignMeIn } from "./operations.graphql";
import cs from "./styles";

const SignInUser = () => {
  const input = useRef(null);

  return (
    <Mutation
      mutation={SignMeIn}
      update={(cache, { data: { signIn } }) => {
        cache.writeQuery({
          query: Me,
          data: {
            me: signIn.user
          }
        });
      }}
    >
      {(signIn, { loading: authenticating }) =>
        authenticating ? (
          "..."
        ) : (
          <div className={cs.signIn}>
            <form
              onSubmit={event => {
                event.preventDefault();
                signIn({
                  variables: {
                    email: input.current.value
                  }
                }).then(({ data: { signIn: { token } } }) => {
                  if (token) {
                    localStorage.setItem("mlToken", token);
                  }
                });
              }}
            >
              <input
                ref={input}
                type="email"
                className={cs.input}
                placeholder="your email"
              />
              <input type="submit" className={cs.button} value="Sign In" />
            </form>
          </div>
        )
      }
    </Mutation>
  );
};

export default SignInUser;
