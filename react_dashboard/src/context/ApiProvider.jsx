import axios from 'axios';
import React, { createContext, useReducer } from 'react';

// Tạo context
export const ApiContext = createContext();

const initialState = {
  apiData: null,
  chartData: null,
  user: null,
};

const actions = {
  GET_API_DATA: 'GET_API_DATA',
  GET_CHART_DATA: 'GET_CHART_DATA',
  SET_USER_INFO: 'SET_USER_INFO',
  LOGOUT: 'LOGOUT',
};

//Reducer to Handle Actions
const reducer = (state, action) => {
  switch (action.type) {
    case actions.GET_API_DATA:
      return {
        ...state,
        apiData: action.data,
      };
    case actions.GET_CHART_DATA:
      return {
        ...state,
        chartData: action.data,
      };
    case actions.LOGIN:
      return {
        ...state,
        user: action.data,
      };
    case actions.SET_USER_INFO:
      return {
        ...state,
        user: action.data,
      };
    case actions.LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
};

export const ApiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    apiData: state.apiData,
    chartData: state.chartData,
    user: state.user,
    // getAPIData: async (id) => {
    //   try {
    //     const response = await fetch(`http://sanslab1.ddns.net:5002/api/device/get/data_by_key`);
    //     const data = await response.json();
    //     dispatch({ type: actions.GET_API_DATA, data });
    //   } catch (error) {
    //     console.error('Error fetching API data:', error);
    //   }
    // },
    getChartData: async (API, num_data) => {
      try {
        console.log(API);
        const response = await fetch('http://sanslab1.ddns.net:5002/api/device/get/data_by_key', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ API_key: API, num_data: num_data }),
        });
        const data = await response.json();
        console.log(data);
        dispatch({ type: actions.GET_CHART_DATA, data });
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    },
    login: async (data) => {
      try {
        const response = await axios.post('http://localhost:8000/v1/auth/login', data);
        if (response) {
          localStorage.setItem('userToken', response.data.accessToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
          axios.defaults.withCredentials = false;
          dispatch({ type: actions.SET_USER_INFO, data: response.data });
          return true;
        }
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    },
    setUserInfo: (data) => {
      dispatch({ type: actions.SET_USER_INFO, data: data });
    },
    logout: () => {
      localStorage.removeItem('userToken');
      dispatch({ type: actions.LOGOUT });
    }
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
