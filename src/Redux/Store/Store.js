import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginReducer from "../Slice/LoginSlice"
import SignUpReducer from "../Slice/SignUpSlice"
import ForgoteReducer from "../Slice/ForgoteSlice"
import AddTransactionReducer from '../Slice/AddTransactionSlice';
import AddWishlistReducer from '../Slice/AddWishlistSlice';
import EditWishlistReducer from '../Slice/EditWishlistSlice';
import DeleteWishlistReducer from '../Slice/DeleteWishlistSlice';
import GetTransactionReducer from '../Slice/GetTransectionSlice';
import GetWishlistReducer from '../Slice/GetWishlistSlice';
import GetUserDetailsReducer from '../Slice/GetUserDetailsSlice';
import GetFriendsReducer from '../Slice/GetFriendsSlice';
import GetGroupsReducer from '../Slice/GetGroupsSlice';
import AddPaymentLogReducer from '../Slice/AddPaymentLogSlice';
import GetPaymentLogReducer from '../Slice/GetPaymentLogSlice';
import AddFriendReducer from '../Slice/AddFriendSlice';
import AddGroupReducer from '../Slice/AddGroupSlice';
import GetVideoReducer from '../Slice/GetVideoSlice';
import GetFounderReducer from '../Slice/GetFounderSlice';
import GetArticleReducer from '../Slice/GetArticleSlice';
import SettleUpReducer from '../Slice/SettleUpSlice';
import HelpAndSupportReducer from '../Slice/HelpAndSupportSlice';
import PrivacyPolicyReducer from '../Slice/PrivacyPolicySlice';
import GetInterestReducer from '../Slice/GetInterestSlice';
import EditProfileReducer from '../Slice/EditProfileSlice';
import GetCategoriesReducer from '../Slice/GetCategoriesSlice';
import EditTransactionReducer from '../Slice/EditTransectionSlice';
import DeleteTransectionReducer from '../Slice/DeleteTransectionSlice';
import AddMonthlyBudgetReducer from '../Slice/AddMonthlyBudgetSlice';
import EditMonthlyBudgetReducer from '../Slice/EditMonthlyBudgetSlice';
import GetMonthlyBudgetReducer from '../Slice/GetMonthlyBudgetSlice';
import AddGroupMemberReducer from '../Slice/AddGroupMemberSlice';
import GetGroupMembersReducer from '../Slice/GetGroupMemberSlice';
import AddGroupExpenseReducer from '../Slice/AddGroupExpenseSlice';
import GetGroupExpenseReducer from '../Slice/GetGroupExpenseSlice';
import DeleteGroupMemberReducer from '../Slice/DeleteGroupMemberSlice';
import DeleteGroupExpenseReducer from '../Slice/DeleteGroupExpenseSlice';
import DeviceTokenReducer from '../Slice/DeviceTokenSlice';
import FcmReducer from '../Slice/FcmSlice';
import NotificationReducer from '../Slice/NotificationSlice';
import SettleUpRespondReducer from '../Slice/SettleUpRespondSlice';
import DeleteGroupReducer from '../Slice/DeleteGroupSlice';
import RemainderReducer from '../Slice/RemainderSlice';
import DeleteAccountReducer from '../Slice/DeleteAccountSlice';
import ChangePasswordReducer from '../Slice/ChangePasswordSlice'

const rootReducer = combineReducers({
  Login: LoginReducer,
  SignUp: SignUpReducer,
  Forgote: ForgoteReducer,
  AddTransaction: AddTransactionReducer,
  AddWishlist: AddWishlistReducer,
  Editwishlist: EditWishlistReducer,
  DeleteWishlist: DeleteWishlistReducer,
  GetTransaction: GetTransactionReducer,
  GetWishlist : GetWishlistReducer,
  GetUserDetails : GetUserDetailsReducer,
  GetFriends : GetFriendsReducer,
  GetGroups : GetGroupsReducer,
  AddPaymentLog : AddPaymentLogReducer, 
  GetPaymentLog : GetPaymentLogReducer,
  AddFriend : AddFriendReducer,
  AddGroup : AddGroupReducer,
  GetVideo : GetVideoReducer,
  GetFounder : GetFounderReducer, 
  GetArticle : GetArticleReducer,
  SettleUp : SettleUpReducer,
  HelpAndSupport : HelpAndSupportReducer,
  PrivacyPolicy : PrivacyPolicyReducer,
  GetInterest : GetInterestReducer,
  EditProfile : EditProfileReducer,
  GetCategories : GetCategoriesReducer,
  EditTransaction : EditTransactionReducer,
  DeleteTransection : DeleteTransectionReducer,
  AddMonthlyBudget : AddMonthlyBudgetReducer,
  EditMonthlyBudget : EditMonthlyBudgetReducer,
  GetMonthlyBudget : GetMonthlyBudgetReducer,
  AddGroupMember : AddGroupMemberReducer,
  GetGroupMembers : GetGroupMembersReducer,
  AddGroupMember : AddGroupExpenseReducer,
  GetGroupExpense : GetGroupExpenseReducer,
  DeleteGroupMember : DeleteGroupMemberReducer,
  DeleteGroupExpense : DeleteGroupExpenseReducer,
  DeviceToken : DeviceTokenReducer,
  Fcm: FcmReducer,
  Notifications: NotificationReducer,
  SettleUpRespond : SettleUpRespondReducer,
  DeleteGroup : DeleteGroupReducer,
  Remainder : RemainderReducer,
  DeleteAccount : DeleteAccountReducer,
  ChangePassword : ChangePasswordReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'Login', 
    'SignUp', 
    'Forgote', 
    'AddTransaction', 
    'AddWishlist', 
    'Editwishlist',
    'DeleteWishlist',
    'GetTransaction',
    'GetWishlist',
    'GetUserDetails',
    'GetFriends',
    'GetGroups',
    'AddPaymentLog',
    'GetPaymentLog',    
    'AddFriend',
    'AddGroup',
    'Fcm',
    'Notifications',
    'DeleteAccount',
    'ChangePassword'
  ],
  // blacklist: ["QuotationList", "ScheduleList"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
