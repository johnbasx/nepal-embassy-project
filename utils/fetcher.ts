import axios from 'axios';

export interface FetchDataType {
  token: string;
  url: String;
}
export const FetchData = async (token: string, url: string) => {
  try {
    const response = await axios(url, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
    return response.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data;
  }
};

export const Update = async (token: string, url: string, data: object) => {
  try {
    const response = await axios.put(url, data, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
    // console.log(response);
    return 1;
  } catch (e: any) {
    console.log(e);
    return 0;
  }
};

export const PostData = async (
  token: string | undefined,
  url: string,
  data: object
) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        authorization: 'Bearer ' + token,
        'content-type': 'multipart/form-data',
      },
    });
    // console.log(response);
    let returnValue = 1;

    return { response, returnValue };
  } catch (e: any) {
    console.log(e);
    return e;
  }
};

export const CreateUser = async (token: string | undefined , url: string, data: object) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        authorization: 'Bearer ' + token
      }
    });
    console.log(response);
    return 1;
  } catch (e: any) {
    console.log(e);
    return 0;
  }
};

// new

export const UpdateHandler = async (
  token: string,
  url: string,
  data: object
) => {
  try {
    const response = await axios.put(url, data, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
    // console.log(response);
    return response;
  } catch (error: any) {
    // console.log(error);
    return error.response;
  }
};
