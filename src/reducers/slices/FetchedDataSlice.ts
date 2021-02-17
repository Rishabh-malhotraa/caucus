import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import StateInterface from "reducers/types";
import { ContestListType, QuestionMapType, SubmissionType, UserInfoType } from 'types'

export const FetchedData = createSlice({
  name: "FetchDataReducer",
  initialState: {
    submissionList: [] as SubmissionType[],
    questionMap: {} as QuestionMapType,
    userInfo: {} as UserInfoType,
    contestData: [] as ContestListType[],
    apiFetched: false
  },
  reducers: {
    saveSubmissionList: (state, action: PayloadAction<SubmissionType[]>) => {
      state.submissionList = action.payload;
    },
    saveQuestionMap: (state, action: PayloadAction<QuestionMapType>) => {
      state.questionMap = action.payload;
    },
    saveUserInfo: (state, action: PayloadAction<UserInfoType>) => {
      state.userInfo = action.payload;
    },
    saveContestInfo: (state, action: PayloadAction<ContestListType[]>) => {
      state.contestData = action.payload;
    },
    saveApiFetched: (state, action: PayloadAction<boolean>) => {
      state.apiFetched = action.payload;
    },
  },
});

export const selectSubmissionList = (state: StateInterface): SubmissionType[] => state.fetchData.submissionList;
export const selectQuestionMap = (state: StateInterface): QuestionMapType => state.fetchData.questionMap;
export const selectUserInfo = (state: StateInterface): UserInfoType => state.fetchData.userInfo;
export const selectContestData = (state: StateInterface): ContestListType[] => state.fetchData.contestData;
export const selectApiFetched = (state: StateInterface): boolean => state.fetchData.apiFetched;


export const { saveQuestionMap, saveContestInfo, saveUserInfo, saveSubmissionList, saveApiFetched } = FetchedData.actions;

export default FetchedData.reducer;
