import { authProvider } from "../authProvider/authProvider";

const apiUrl = process.env.REACT_APP_URL;

export const dataProvider = {
  getList: (resource, params) => {
    const token = localStorage.getItem("token");
    authProvider.getPermissions();
    let query = `/all`;

    const key = resource;
    const request = new Request(apiUrl + `api/` + resource + query, {
      method: "GET",
      body: null,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return fetch(request)
      .then(async (response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json[key];
        for (let i = 0; i < data.length; i++) {
          data[i].id = data[i]._id;
          delete data[i]._id;
        }
        return { data: data, total: data.length };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  getOne: async (resource, params) => {
    const token = localStorage.getItem("token");
    let query = `/get?_id=${params.id}`;
    const key = resource;

    const request = new Request(apiUrl + `api/` + resource + query, {
      method: "GET",
      body: null,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return fetch(request)
      .then(async (response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json[key];
        data.id = data._id;
        delete data._id;
        return { data: data };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  update: async (resource, params) => {
    const token = localStorage.getItem("token");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    let query = "/admin/update";
    let body = {};
    const key = resource;
    if (resource === "user") {
      body = { _id: params.id, sex: params.data.sex, phone: params.data.phone, typeOfPain: params.data.typeOfPain };
    }
    else if(resource === "report"){
      body = { _id: params.id,  result: params.data.result, typeOfPain: params.data.typeOfPain };
    }
    else if(resource === "test"){
      body = { _id: params.id, testTime: params.data.testTime, result: params.data.result };
    }
    body = JSON.stringify(body);

    const request = new Request(apiUrl + `api/` + resource + query, {
      method: "PUT",
      body: body,
      headers: headers,
    });
    return fetch(request)
      .then(async (response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json[key];
        data.id = data._id;
        delete data._id;
        return { data: data };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  create: async(resource, params) => {
    // let result_base64 = await new Promise((resolve) => {
    //   let fileReader = new FileReader();
    //   fileReader.onload = (e) => resolve(fileReader.result);
    //   fileReader.readAsText(params.data.files.rawFile);
    // });
    // const power = JSON.parse(result_base64);

    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    let query = "";
    let body = {};

    if (resource === "user") {
      query = `/register`;
      body = {
        surname: params.data.surname,
        email: params.data.email,
        password: params.data.password,
        sex: params.data.sex,
        phone: params.data.phone
      };
    } else if (resource === "report") {
      query = `/create`;
      body = {
        userName: params.data.userName,
        reportDate: params.data.reportDate,
        result: params.data.result,
        typeOfPain: params.data.typeOfPain,
        test_id: params.data.test_id,
        user_id: params.data.user_id
      };
    } else if (resource === "test") {
      let result_base64 = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.readAsText(params.data.files.rawFile);
      });
      // const power = JSON.parse(result_base64);
  
      query = `/create`;
      body = {
        name: params.data.name,
        testDate: params.data.testDate,
        testTime: params.data.testTime,
        result: params.data.result,
        user_id: params.data.user_id,
        power: JSON.parse(result_base64)
      };
    }
    const key = resource;

    body = JSON.stringify(body);
    const request = new Request(apiUrl + `api/` + resource + query, {
      method: "POST",
      body: body,
      headers: headers,
    });
    return fetch(request)
      .then(async (response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json[key];
        data.id = data._id;
        delete data._id;
        return { data: data };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  delete: async (resource, params) => {
    const token = localStorage.getItem("token");
    let query = `/admin/delete`;

    const key = resource;
    let body = { _id: params.id, gameId: params.previousData.gameId };
    body = JSON.stringify(body);
    const request = new Request(apiUrl + `api/` + resource + query, {
      method: "DELETE",
      body: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return fetch(request)
      .then(async (response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json[key];
        data.id = data._id;
        delete data._id;
        return { data: data };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },
};