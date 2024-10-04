import axios from "axios";
import Cookies from "js-cookie";
// import { toast } from "sonner";

// const baseURL = "https://nest-ecommerce-1fqk.onrender.com";
const token = Cookies.get("access_token");

export const Axios = axios.create({
	baseURL: "https://nest-ecommerce-1fqk.onrender.com",
	// baseURL: "http://192.168.160.1:3000",
	headers: token ? { Authorization: `Bearer ${token}` } : {},
});

Axios.interceptors.request.use(
	(config) => {
		const token = Cookies.get("access_token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// Axios.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		const originalRequest = error.config;
// 		if (
// 			error.response &&
// 			error.response.status === 401 &&
// 			!originalRequest._retry
// 		) {
// 			originalRequest._retry = true;
// 			try {
// 				const response = await axios.get(`${baseURL}/auth/token-refresh`, {
// 					withCredentials: true,
// 				});

// 				const newAccessToken = response.data.access_token;
// 				if (newAccessToken) {
// 					Cookies.set("access_token", newAccessToken);
// 					Axios.defaults.headers.common["Authorization"] =
// 						`Bearer ${newAccessToken}`;
// 					originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
// 				}

// 				return Axios(originalRequest);
// 			} catch (refreshError) {
// 				Cookies.remove("access_token");
// 				Cookies.remove("refresh_token");
// 				Cookies.remove("user");
// 				toast.error("Session expired. Please sign in again.");
// 				window.location.href = "/sign-in";
// 				return Promise.reject(refreshError);
// 			}
// 		}
// 		return Promise.reject(error);
// 	},
// );

// import axios from "axios";
// import Cookies from "js-cookie";
// import { toast } from "sonner";

// const baseURL = "https://nest-ecommerce-1fqk.onrender.com";

// const token = Cookies.get("access_token");

// export const Axios = axios.create({
//   baseURL,
//   headers: token ? { Authorization: `Bearer ${token}` } : {},
// });

// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// Axios.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("access_token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise(function (resolve, reject) {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers["Authorization"] = "Bearer " + token;
//             return Axios(originalRequest);
//           })
//           .catch((err) => {
//             return Promise.reject(err);
//           });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       const refreshToken = Cookies.get("refresh_token");

//       return new Promise(function (resolve, reject) {
//         axios
//           .post(`${baseURL}/auth/token-refresh`, { refreshToken })
//           .then(({ data }) => {
//             Cookies.set("access_token", data.accessToken, { expires: 7 });
//             Axios.defaults.headers.common["Authorization"] = "Bearer " + data.accessToken;
//             originalRequest.headers["Authorization"] = "Bearer " + data.accessToken;
//             processQueue(null, data.accessToken);
//             resolve(Axios(originalRequest));
//           })
//           .catch((err) => {
//             processQueue(err, null);
//             Cookies.remove("access_token");
//             Cookies.remove("refresh_token");
//             Cookies.remove("user");
//             toast.error("Session expired. Please sign in again.");
//             window.location.href = "/sign-in";
//             reject(err);
//           })
//           .finally(() => {
//             isRefreshing = false;
//           });
//       });
//     }

//     return Promise.reject(error);
//   }
// );
