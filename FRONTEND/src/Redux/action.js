import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// write all functions here

export const post_Order = createAsyncThunk(
  "order/post_Order",
  async (payload, options) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let auth = {
        headers: {
          Authorization: token,
        },
      };
      console.log(auth.headers);

      const res = await axios.post(
        `https://steph-ordermanagement.onrender.com/order/add/`,
        payload,
        auth
      );
      // console.log(res.data.message)

      return res.data.message;
    } catch (er) {
      const { rejectWithValue } = options;
      console.log(er);
      return rejectWithValue({ message: er });
    }
  }
);

export const get_user_item_data = createAsyncThunk(
  "item/get_user_item_data",
  async (payload, options) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let auth = {
        headers: {
          Authorization: token,
        },
      };

      const res = await axios.get(
        `https://steph-ordermanagement.onrender.com/order/${payload}`,
        auth
      );
      // console.log(res.data.message)

      return res.data.message;
    } catch (er) {
      const { rejectWithValue } = options;
      console.log(er);
      return rejectWithValue({ message: er });
    }
  }
);


export const production_Quantity_Update = createAsyncThunk(
  "item/production_Quantity_Update",
  async (payload, options) => {
    try {
      console.log(payload);
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user.role;
    let auth = { 
      headers: {
        Authorization: token,
      },
    };
 
      const res = await axios.patch(
        `https://steph-ordermanagement.onrender.com/item/production_Quantity/${payload.product_id}`,
        payload,
        { ...auth, role }
      );
      
      console.log(res.data.message);
      return res.data.message;
    } catch (er) {
      const { rejectWithValue } = options;
      console.log(er);
      return rejectWithValue({ message: er.response.data });
    }
  }
);




export const UpdateQuantity_ByUser_Cancel = createAsyncThunk(
  "item/UpdateQuantity_ByUser_Cancel",
  async (payload, options) => {
    try {
      console.log(payload);
      const token = JSON.parse(localStorage.getItem("token"));
      let auth = {
        headers: {
          Authorization: token,
        },
      };
      
      const res = await axios.patch(
        `https://steph-ordermanagement.onrender.com/item/editCancel_userQuant/${payload.id}`,
        { payload },
        auth
      );
      console.log(res.data.message);
      return res.data.message;

    } catch (er) {
      const { rejectWithValue } = options;
      console.log(er.data.message);
      return rejectWithValue({ message: er.data.message });
    }
  }
);



export const UpdateQuantity_ByAdmin_Cancel = createAsyncThunk(
  "item/UpdateQuantity_ByAdmin_Cancel",
  async (payload, options) => {
    try {
      console.log(payload);
      const token = JSON.parse(localStorage.getItem("token"));
      const user = JSON.parse(localStorage.getItem("user"));
      const role = user.role;
      let auth = {
        headers: {
          Authorization: token,
        },
      };

      const res = await axios.patch(
        `https://steph-ordermanagement.onrender.com/item/editCancel_quant/${payload.id}`,
        { payload },
        { ...auth, role }
      );
      console.log(res.data.message);
      return res.data.message;

    } catch (er) {
      const { rejectWithValue } = options;
      console.log(er.data.message);
      return rejectWithValue({ message: er.data.message });
    }
  }
);

export const UpdateQuantity = createAsyncThunk(
  "item/UpdateQuantity",
  async (payload, options) => {
    try {
      console.log(payload);
      const token = JSON.parse(localStorage.getItem("token"));
      let auth = {
        headers: {
          Authorization: token,
        },
      };

      const res = await axios.patch(
        `https://steph-ordermanagement.onrender.com/item/updateQty/${payload.id}`,
        { payload },
        auth
      );
      console.log(res.data.message);

      return res.data.message;
    } catch (er) {
      const { rejectWithValue } = options;
      console.log(er);
      return rejectWithValue({ message: er });
    }
  }
);

export const del_single_Item = createAsyncThunk(
  "item/del_single_Item",
  async (payload, options) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let auth = {
        headers: {
          Authorization: token,
        },
      };
      const res = await axios.delete(
        `https://steph-ordermanagement.onrender.com/item/remove/${payload}`,
        auth
      );
      console.log(res);

      return res.data.message;
    } catch (er) {
      const { rejectWithValue } = options;

      console.log(er.data);
      return rejectWithValue({ message: er });
    }
  }
);

export const post_New_Item = createAsyncThunk(
  "item/post_New_Item",
  async (payload, options) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const user = JSON.parse(localStorage.getItem("user"));
      const role = user.role;
      let auth = {
        headers: {
          Authorization: token,
        },
      };
      console.log(payload);
      console.log({ ...auth, role });
      let res = await axios.post(
        `https://steph-ordermanagement.onrender.com/item/add_item`,
        payload,
        { ...auth, role }
      );

      // console.log(res.data.message)
      return res.data.message;
    } catch (er) {
      const { rejectWithValue } = options;

      return rejectWithValue({ message: er.data.message });
    }
  }
);

export const get_All_Item = createAsyncThunk(
  "item/get_All_Item",
  async (payload, options) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const user = JSON.parse(localStorage.getItem("user"));
      const role = user.role;
      let auth = {
        headers: {
          Authorization: token,
        },
      };
      console.log({ ...auth, role });
      let res = await axios.get(
        `https://steph-ordermanagement.onrender.com/item`,
        {
          ...auth,
          role,
        }
      );

      // console.log(res.data.message)
      return res.data.message;
    } catch (er) {
      const { rejectWithValue } = options;

      return rejectWithValue({ message: er });
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (payload, { rejectWithValue }) => {
    try {
      // console.log(payload);
      const data = await axios.post(
        "https://steph-ordermanagement.onrender.com/signup/add_user",
        payload
      );
      // console.log(data);

      return data;
    } catch (error) {
      console.error(error);

      throw rejectWithValue(
        error.response ? error.response.data : "Server Error"
      );
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (payload, options) => {
    try {
      console.log(payload);
      const res = await axios.post(
        `https://steph-ordermanagement.onrender.com/signup/signin`,
        payload
      );
      console.log(res.data);
      return res.data;
    } catch (er) {
      const { rejectWithValue } = options;
      console.log(er.response.data);
      console.log(rejectWithValue());
      return rejectWithValue({ message: er.response.data });
    }
  }
);

// let token = JSON.parse(localStorage.getItem("user"));
// localStorage.setItem("user", JSON.stringify(res.data));
//refresh token , exp
//access token ,
