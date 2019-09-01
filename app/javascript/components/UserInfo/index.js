import React from "react";
import { Query } from "react-apollo";
import { Me } from "./operations.graphql";
import cs from "./styles";
import SignInUser from "./signInUser";

const UserInfo = () => {
  return (
    <div className={cs.panel}>
      <Query query={Me}>
        {({ data, loading }) => {
          if (loading) return "...Loading";
          if (!data.me) {
            return <SignInUser />;
          }

          const { fullName } = data.me;
          return <div className={cs.info}>😈 {fullName}</div>;
        }}
      </Query>
    </div>
  );
};

export default UserInfo;
