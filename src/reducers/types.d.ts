import { QuestionMapType, UserInfoType, ContestListType, SubmissionType } from 'types';
export default interface StateInterface {
  // the key used in store.ts and the objectkey used here should match
  fetchData: {
    submissionList: SubmissionType[];
    questionMap: QuestionMapType;
    contestData: ContestListType[];
    userInfo: UserInfoType;
    apiFetched: boolean;
  }
}
