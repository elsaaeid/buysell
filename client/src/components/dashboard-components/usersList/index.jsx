import React, {useState, useEffect} from 'react';
import {SearchContainer} from "../../global-components/search-container/SearchContainer";
import ChangeRole from "../changeRole/ChangeRole";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../../redux/features/auth/authSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  FILTER_USERS,
  selectUsers
} from "../../../redux/features/auth/filterSlice";
import ReactPaginate from "react-paginate";
import Header from "../Header";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import "./UserSearch.css"

const columns = [
  { id: 's/n', label: 's/n' },
  { id: 'name', label: 'Name' },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'role',
    label: 'Role',
  },
  {
    id: 'changeRole',
    label: 'Change Role',
  },
  {
    id: 'action',
    label: 'Action',
  },
];

const UsersList = () => {
  // Theme Colors Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // A hook to access the redux dispatch function.
  const dispatch = useDispatch();

  // Search State
  const [search, setSearch] = useState("");

  // openUserSearch State
  const [openUserSearch, setOpenUserSearch] = useState(true);
  // To Access Auth State
  const { users, isLoading } = useSelector(
    (state) => state.auth
  );
  // A hook to access the redux store's state. 
  const filteredUsers = useSelector(selectUsers);
  
  // Getting Users
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Removing Users
  const removeUser = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(getUsers());
  };

  // confirmDelete Function
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete This User",
      message: "Are you sure to do delete this user?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(id),
        },
        {
          label: "Cancel",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  // USERS FILTER
  useEffect(() => {
    dispatch(FILTER_USERS({ users, search }));
  }, [dispatch, users, search]);

  // Begin Pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };

  // End Pagination

 
  // set Open For User Search
  useEffect(()=>{
    if(search == "") {
      setOpenUserSearch(true);
    }
    else {
      setOpenUserSearch(false);
    }
  }, [search]);
  
    const searchCloseHandle = ()=> {
      setSearch("");
      setOpenUserSearch(true);
    };

  return (
    <div className="flex flex-col justify-center items-center user-list w-full">
    <div className="flex flex-col users-search">
      <Header title="All Users" />
        <SearchContainer
          style={{
              color: colors.grey[500],
          }}
          SearchChange={(e)=> setSearch(e.target.value)}
          SearchValue={search}
          searchCloseHandle={searchCloseHandle}
          openSearch={openUserSearch}
          searchIconTop="16px"
      />
    </div>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <div 
        className="p-5 w-full">
          {/* Table */}
          {!isLoading && users.length === 0 ? (
            <p>No user found...</p>
          ) : (
            <table className='w-full overflow-x-scroll'>
              <thead>
                  <tr>
                  {columns.map((column) => (
                    <th
                      style={{
                        color: colors.grey[500],
                      }}
                      key={column.id}
                    >
                      {column.label}
                    </th>
                  ))}
                  </tr>
                </thead>

              <tbody>
                {currentItems.map((user, index) => {
                  const { _id, name, email, role } = user;

                  return (
                    <tr
                    style={{
                      color: colors.grey[500],
                    }}
                    key={_id}>
                      <td
                      style={{
                        color: colors.grey[500],
                      }}
                      >{index + 1}</td>
                      <td
                      style={{
                        color: colors.grey[500],
                      }}
                      >{name}</td>
                      <td
                      style={{
                        color: colors.grey[500],
                      }}
                      >{email}</td>
                      <td
                      style={{
                          color: colors.grey[500],
                        }}
                      >{role}</td>
                      <td
                      style={{
                          color: colors.grey[500],
                        }}
                      >
                        <ChangeRole _id={_id} email={email} />
                      </td>
                      <td 
                      style={{
                        color: colors.grey[500],
                      }}
                      className="flex justify-center items-center">
                        <span>
                          <FaTrashAlt
                            size={20}
                            color="red"
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <hr />
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </TableContainer>
    </Paper>
  </div>
  )
}

export default UsersList