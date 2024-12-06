import ky, { NormalizedOptions } from "ky";
import { selloIdUrl } from "../constants/AppConstants";
import { setRefreshToken, setToken } from "../reducers/AuthReducer";
import { RoutesEnum } from "../constants/Routes";
import { NavigateFunction } from "react-router";
import { Dispatch } from "react";
import { AnyAction } from "redux";

export const regetToken = (
  options: NormalizedOptions,
  refreshToken: string | undefined,
  dispatch: Dispatch<AnyAction>,
  logout: (() => void) | undefined,
  navigate: NavigateFunction,
) => {
  ky.post("v2/dashboard/auth/refresh", {
    headers: {
      "X-REALM": "sello-pay",
    },
    json: {
      refreshToken: refreshToken,
    },
    prefixUrl: selloIdUrl,
  })
    .json()
    .then((res: any) => {
      options.retry;
      dispatch(setToken({ token: res.accessToken }));
      dispatch(setRefreshToken({ refreshToken: res.refreshToken }));
    })
    .catch(() => {
      if (logout) {
        logout();
        window.location.reload();
        navigate(RoutesEnum.Auth);
      }
    });
};
