import axios from "axios";
import Modal from "../components/modal";

const API = axios.create({
  baseURL: "https://codepad-ncs.herokuapp.com",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("accessToken")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
  }
  return req;
});

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const signUp = async (formData, history, formMessage, openModal) => {
  try {
    await API.post(`/accounts/users/`, formData, config);
    openModal("You are signed in", "Okay");
    <Modal />;
    history.push("/login");
  } catch (error) {
    await formMessage(error?.response?.data);
  }
};

export const signIn = async (formData, history, formMessage, openModal) => {
  try {
    const { data } = await API.post(`/accounts/jwt/create`, formData, config);
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
    openModal("You are logged in", "Okay");
    <Modal />;
    history.push("/");
    userInfo();
  } catch (error) {
    await openModal("Enter the valid credentials", null);
    <Modal />;
  }
};

export const signOut = (history) => {
  localStorage.clear();
  history.push("/");
};

export const userInfo = async () => {
  try {
    const { data } = await API.get(`/accounts/users/me`, config);
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    <Modal errorMessage="You are Logged out!!" />;
    localStorage.clear();
  }
};

export const editUserInfo = async (formData, history, openModal) => {
  try {
    const { data } = await API.patch(`/accounts/users/me/`, formData, config);
    localStorage.setItem("user", JSON.stringify(data));
    openModal("Information updated", "Okay");
    <Modal />;
    history.push("/");
  } catch (error) {
    <Modal errorMessage={error.response.data} />;
  }
};

export const getAllEvents = async () => {
  try {
    const { data } = await API.get("/events/");

    return data;
  } catch (error) {}
};

export const getEvent = async (slug) => {
  try {
    const { data } = await API.get(`/events/${slug}`, config);

    return data;
  } catch (error) {}
};

export const getProblem = async (slug) => {
  try {
    const { data } = await API.get(`/problems/${slug}`);

    return data;
  } catch (error) {}
};

export const codeSubmission = async (formData) => {
  try {
    const { data } = await API.post(`/submissions/`, formData, config);
    return data;
  } catch (error) {}
};

export const getLeaderboard = async (slug) => {
  try {
    const { data } = await API.get(`/leaderboard/${slug}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getLeaderboardUser = async (slug, username) => {
  try {
    console.log("username= ", username);
    const { data } = await API.get(`/leaderboard/${slug}?username=${username}`);
    console.log("USERDATA", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = async (formData, history, openModal) => {
  try {
    const { data } = await API.post(
      `/accounts/users/reset_password/`,
      formData,
      config
    );
    openModal("Check your email", "Okay");
    <Modal />;
    history.push("/");
  } catch (error) {}
};

export const resetPassword = async (formData, uid, token, history) => {
  try {
    const { data } = await API.post(
      `/accounts/users/reset_password_confirm/`,
      { ...formData, uid, token },
      config
    );
    console.log(data);
    history.push("/");
  } catch (error) {}
};

export const getSubmissions = async (slug) => {
  try {
    const { data } = await API.get(`/submissions/${slug}`,  config);
    return data;
  } catch (error) {
    console.log(error);
  }
};
