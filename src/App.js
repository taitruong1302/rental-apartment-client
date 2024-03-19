import { Route, Routes } from "react-router-dom";
import { DetailPost, Home, HomePage, Login, Rental, SearchDetail } from "./containers/public";
import { path } from "./utils/constant";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { System, CreatePost, ManagePost, EditAccount } from './containers/system'
import { useEffect } from "react";
import * as actions from './store/actions'
import { useDispatch, useSelector } from 'react-redux/'

function App() {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrentUserInfor())
    }, 100)

  }, [isLoggedIn])

  useEffect(() => {
    dispatch(actions.getPrices())
    dispatch(actions.getAcreage())
    dispatch(actions.getAreas())
  }, [])
  return (
    <div className="App bg-primary h-auto">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path='*' element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.APARTMENT} element={<Rental />} />
          <Route path={path.BEDSIT} element={<Rental />} />
          <Route path={path.HOUSES} element={<Rental />} />
          <Route path={path.PREMISES} element={<Rental />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route path={path.DETAIL_POST__TITLE__POSTID} element={<DetailPost />} />
        </Route>

        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={5}
      />
    </div>
  );
}

export default App;
