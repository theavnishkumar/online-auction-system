import { env } from "../config/env.config.js";

const isProduction = env.node_env === "production";

export const setCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  if (isProduction && env.cookie_domain) {
    cookieOptions.domain = env.cookie_domain;
  }

  return res.cookie("auth_token", token, cookieOptions);
};

export const clearCookie = (res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  };

  if (isProduction && env.cookie_domain) {
    cookieOptions.domain = env.cookie_domain;
  }

  return res.clearCookie("auth_token", cookieOptions);
};
