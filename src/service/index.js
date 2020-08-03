export function myLogin(params) {
  return request({
    method: "post",
    url: "/api1/user/login",
    data: params //post用data,get用params
  });
}
