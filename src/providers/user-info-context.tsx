import { createContext, useState } from "react";
import { UserDataInterface } from "../Interfaces/UserDataInterface";

const UserInfoContext = createContext<{
  userData: UserDataInterface | any;
  setUserData: (info: any) => void;
}>({
  userData: {},
  setUserData: (info: any) => {},
});

interface Props {
  readonly children: React.ReactNode;
}

export function UserInfoContextProvider({ children }: Props) {
  const [userData, setUserData] = useState({});

  const context = { setUserData, userData };

  return (
    <UserInfoContext.Provider value={context}>
      {children}
    </UserInfoContext.Provider>
  );
}

export default UserInfoContext;
